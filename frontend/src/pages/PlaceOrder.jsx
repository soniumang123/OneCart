import React, { useContext, useState } from "react";
import Title from "../Components/Title.jsx";
import CartTotal from "../Components/CartTotal.jsx";
import razorpay from "../assets/Razorpay.jpg";
import { shopDataContext } from "../context/ShopContext.jsx";
import { authDataContext } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const navigate = useNavigate();
  const [method, setMethod] = useState("cod");
  const [loading, setLoading] = useState(false)
  let { cartItem, setCartItem, getCartAmount, delivery_fee, products } =
    useContext(shopDataContext);
  let { serverUrl } = useContext(authDataContext);

  const [formData, setFormData] = useState({
    firstName: "",
    LastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    phone: "",
  });
  const onchangehandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Order Payment",
      description: "Order Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        console.log(response);

        const { data } = await axios.post(
          serverUrl + "/api/order/verifyrazorpay",
          response,
          { withCredentials: true },
        );
        if(data){
          navigate('/order')
          setCartItem({})
        }
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };
  const onSubmithandle = async (e) => {
    e.preventDefault();
    try {
      let orderItems = [];
      for (const items in cartItem) {
        for (const item in cartItem[items]) {
          if (cartItem[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items),
            );
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItem[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }
      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };
      switch (method) {
        
        case "cod":
          setLoading(true)
          const result = await axios.post(
            serverUrl + "/api/order/placeorder",
            orderData,
            { withCredentials: true },
          );
          console.log(result.data);
          toast.success("Order Placed")
          setLoading(false)
          if (result.data) {
            setCartItem({});
            navigate("/order");
          } else {
            console.log(result.data.message);
            toast.error("Order not placed")
          }
          break;

        case "razorpay":
          console.log("1. Razorpay selected");
          const resultRazorpay = await axios.post(
            serverUrl + "/api/order/razorpay",
            orderData,
            { withCredentials: true },
          );
          console.log("2. Backend response:", resultRazorpay.data);
          if (resultRazorpay.data) {
            console.log("3. Calling initPay");
            initPay(resultRazorpay.data);
          }
          break;

        default:
          break;
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full min-h-screen flex items-center justify-center flex-col md:flex-row gap-12.5 relative md:mb-0 mb-50">
      <div className="lg:w-1/2 w-full h-full flex items-center justify-center lg:mt-0 mt-23">
        <form
          action=""
          className="lg:w-[70%] w-[95%] lg:h-[70%] h-full"
          onSubmit={onSubmithandle}
        >
          <div className="py-2.5 ">
            <Title text1={"DELIVERY "} text2={"INFORMATION"} />
          </div>
          <div className="w-full h-18 flex items-center justify-between px-2.5">
            <input
              type="text"
              placeholder="First Name"
              className="w-[48%] h-12.5 rounded-md bg-slate-700 placeholder:text-white text-[18px] px-5 shadow-sm shadow[#343434] "
              required
              name="firstName"
              onChange={onchangehandler}
              value={formData.firstName}
            />
            <input
              type="text"
              placeholder="Last Name"
              className="w-[48%] h-12.5 rounded-md bg-slate-700 placeholder:text-white text-[18px] px-5 shadow-sm shadow[#343434] "
              required
              name="LastName"
              onChange={onchangehandler}
              value={formData.LastName}
            />
          </div>

          <div className="w-full h-18 flex items-center justify-between px-2.5">
            <input
              type="email"
              placeholder="Email address"
              name="email"
              className="w-full h-12.5 rounded-md bg-slate-700 placeholder:text-white text-[18px] px-5 shadow-sm shadow[#343434] "
              required
              onChange={onchangehandler}
              value={formData.email}
            />
          </div>

          <div className="w-full h-18 flex items-center justify-between px-2.5">
            <input
              type="text"
              placeholder="Street"
              name="street"
              className="w-full h-12.5 rounded-md bg-slate-700 placeholder:text-white text-[18px] px-5 shadow-sm shadow[#343434] "
              required
              onChange={onchangehandler}
              value={formData.street}
            />
          </div>

          <div className="w-full h-18 flex items-center justify-between px-2.5">
            <input
              type="text"
              placeholder="City"
              className="w-[48%] h-12.5 rounded-md bg-slate-700 placeholder:text-white text-[18px] px-5 shadow-sm shadow[#343434] "
              required
              name="city"
              onChange={onchangehandler}
              value={formData.city}
            />
            <input
              type="text"
              placeholder="State"
              className="w-[48%] h-12.5 rounded-md bg-slate-700 placeholder:text-white text-[18px] px-5 shadow-sm shadow[#343434] "
              required
              name="state"
              onChange={onchangehandler}
              value={formData.state}
            />
          </div>

          <div className="w-full h-18 flex items-center justify-between px-2.5">
            <input
              type="text"
              placeholder="Pincode"
              className="w-[48%] h-12.5 rounded-md bg-slate-700 placeholder:text-white text-[18px] px-5 shadow-sm shadow[#343434] "
              required
              name="pincode"
              onChange={onchangehandler}
              value={formData.pincode}
            />
            <input
              type="text"
              placeholder="Country"
              className="w-[48%] h-12.5 rounded-md bg-slate-700 placeholder:text-white text-[18px] px-5 shadow-sm shadow[#343434] "
              required
              name="country"
              onChange={onchangehandler}
              value={formData.country}
            />
          </div>

          <div className="w-full h-18 flex items-center justify-between px-2.5">
            <input
              type="Number"
              placeholder="Phone"
              className="w-full h-12.5 rounded-md bg-slate-700 placeholder:text-white text-[18px] px-5 shadow-sm shadow[#343434] "
              required
              name="phone"
              onChange={onchangehandler}
              value={formData.phone}
            />
          </div>

          <div>
            <button
              type="submit"
              className="text-[18px] active:bg-slate-500 cursor-pointer bg-[#3bcee848] py-2.5 px-12.5 rounded-2xl text-white flex items-center justify-center gap-5 absolute lg:right-[20%] bottom-[5%] right-[35%]  border border-[#80808049] ml-10 mt-5  "
            >
              PLACE ORDER
            </button>
          </div>
        </form>
      </div>
      <div className="lg:w-1/2 w-full min-h-screen flex items-center justify-center gap-7.5">
        <div className="lg:w-[70%] w-[90%] lg:h-[70%] h-full flex items-center justify-center gap-2.5 flex-col ">
          <CartTotal />
          <div className="py-2.5 ">
            <Title text1={"PAYMENT "} text2={"METHOD"} />
          </div>
          <div className="w-full h-[30vh] lg:h-full flex items-start mt-5 lg:mt-0 justify-center gap-12.5 ">
            <button
              onClick={() => setMethod("razorpay")}
              className={`w-38 h-12.5 rounded-sm cursor-pointer ${method === "razorpay" ? "border-5 border-blue-900 rounded-sm" : ""}`}
            >
              <img
                src={razorpay}
                alt=""
                className="w-full h-full object-fill rounded-sm"
              />
            </button>
            <button
              onClick={() => setMethod("cod")}
              className={`w-50 h-12.5 rounded-sm bg-linear-to-t from-[#95b3f8] to-[white] text-[14px] px-5 text-[#332f6f] font-bold cursor-pointer ${method === "cod" ? "border-5 border-blue-900 rounded-sm" : ""}`}
            >
              CASH ON DELIVERY
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
