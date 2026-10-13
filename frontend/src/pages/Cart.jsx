import React, { useContext, useEffect, useState } from "react";
import Title from "../Components/Title.jsx";
import { shopDataContext } from "../context/ShopContext.jsx";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import CartTotal from "../Components/CartTotal.jsx";

const Cart = () => {
  const { products, currency, cartItem, updateQuantity } =
    useContext(shopDataContext);
  const [cartData, setcartData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const tempData = [];
    for (const items in cartItem) {
      for (const item in cartItem[items]) {
        if (cartItem[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItem[items][item],
          });
        }
      }
    }
    setcartData(tempData);
  }, [cartItem]);
  return (
    <div className="w-full min-h-screen p-5 overflow-hidden">
      <div className="h-[8%] w-full text-center mt-15">
        <Title text1={"YOUR "} text2={" CART"} />
      </div>

      <div className="w-full h-[92%] flex flex-wrap gap-5">
        {cartData.map((item, index) => {
          const productData = products.find(
            (product) => product._id === item._id,
          );
          return (
            <div key={index} className="w-full h-[10%] border-t border-b">
              <div className="w-full h-auto flex items-start gap-6 bg-[#51808048] py-2.5 px-5 rounded-2xl relative">
                <img
                  src={productData.image1}
                  alt=""
                  className="w-30 h-30 rounded-md"
                />
                <div className="flex items-start justify-center flex-col gap-2.5 w-1/2">
                  <p className="md:text-[25px] text-[20px] text-[#f3f9fc]">
                    {productData.name}
                  </p>
                  <div className="flex items-center gap-2.5">
                    <p className="text-[20px] text-[#aaf4e7]">
                      {currency}
                      {productData.price}
                    </p>
                  </div>
                  <p
                    className="w-8 h-8 text-[16px] text-white bg-[#51808048] rounded-md mt-0 flex items-center
                                justify-center border border-[#9ff9f9]"
                  >
                    {item.size}
                  </p>
                </div>
                <input
                  type="number"
                  min={1}
                  defaultValue={item.quantity}
                  className="md:max-w-20 max-w-10 md:px-2 md:py-2 py-1 px-2.5 text-white text-[18px] font-semibold bg-[#518080b4] absolute md:top-[40%] top-[70%] left-[83%] md:left-[80%] border border-[#9ff9f9] rounded-md"
                  onChange={(e) =>
                    e.target.value === "" || e.target.value === "0"
                      ? null
                      : updateQuantity(
                          item._id,
                          item.size,
                          Number(e.target.value),
                        )
                  }
                />

                <MdDelete
                  className="text-[#9ff9f9] w-6 h-6 absolute top-[40%] md:top-[45%] md:right-[5%] right-1 cursor-pointer"
                  onClick={() => updateQuantity(item._id, item.size, 0)}
                />
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex justify-center items-end my-5">
        <div className="w-full sm:w-125">
          <CartTotal />
          <button
            className="text-[18px] hover:bg-slate-600 cursor-pointer bg-[#51808048] py-2.5 px-12.5 rounded-2xl text-white flex items-center justify-center gap-5 border border-[#80808049] ml-7.5 mt-5"
            onClick={() => {
              if (cartData.length > 0) {
                navigate("/placeorder");
              } else {
                console.log("Your Cart is Empty");
              }
            }}
          >
            PROCEED TO CHECKOUT
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
