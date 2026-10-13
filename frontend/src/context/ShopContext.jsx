import React, { createContext, useContext, useEffect, useState } from "react";
import { authDataContext } from "./AuthContext.jsx";
import axios from "axios";
import { userDataContext } from "./UserContext.jsx";

export const shopDataContext = createContext();

const ShopContext = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  let { serverUrl } = useContext(authDataContext);
  const [cartItem, setCartItem] = useState({});
  const { userData } = useContext(userDataContext);
  const [loading, setLoading] = useState(false);

  let currency = "₹";
  let delivery_fee = 50;

  const getProducts = async () => {
    try {
      let result = await axios.get(serverUrl + "/api/product/list", {
        withCredentials: true,
      });
      console.log(result.data);
      setProducts(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  const addToCart = async (itemId, size) => {
    if (!size) {
      console.log("Select Product Size");
      return;
    }
    let cartData = structuredClone(cartItem);

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    setCartItem(cartData);

    if (userData) {
      try {
        let result = await axios.post(
          serverUrl + "/api/cart/add",
          { itemId, size },
          { withCredentials: true },
        );
        console.log(result.data);
      } catch (error) {
        console.log(error);
      }
    }
  };
    const updateQuantity = async(itemId,size,quantity)=>{
      let cartData = structuredClone(cartItem);
      cartData[itemId][size] = quantity
      setCartItem(cartData)

      if(userData){
        try {
          await axios.post(serverUrl + '/api/cart/update',{
            itemId,size,quantity
          },{withCredentials:true})
        } catch (error) {
          console.log(error)
        }
      }
    }
  const getUserCart = async () => {
    try {
      const result = await axios.post(
        serverUrl + "/api/cart/get",
        {},
        { withCredentials: true },
      );
      setCartItem(result.data)
      console.log(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItem) {
      for (const item in cartItem[items]) {
        try {
          if (cartItem[items][item] > 0) {
            totalCount += cartItem[items][item];
          }
        } catch (error) {}
      }
    }
    return totalCount;
  };

  const getCartAmount = () =>{
    let totalAmount = 0;
    for(const itemId in cartItem){
      let itemInfo = products.find((product)=> product._id === itemId)
      for(const size in cartItem[itemId]){
        try {
          if(cartItem[itemId][size] > 0){
            totalAmount += itemInfo.price*cartItem[itemId][size];
          }
        } catch (error) {
          console.log(error)
        }
      }
    }
    return totalAmount
  }
  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    getUserCart();
  }, []);


  let value = {
    products,
    currency,
    delivery_fee,
    getProducts,
    setSearch,
    search,
    showSearch,
    setShowSearch,
    cartItem,
    addToCart,
    getCartCount,
    setCartItem,
    updateQuantity,
    updateQuantity,
    getCartAmount
  };
  return (
    <div>
      <shopDataContext.Provider value={value}>
        {children}
      </shopDataContext.Provider>
    </div>
  );
};

export default ShopContext;
