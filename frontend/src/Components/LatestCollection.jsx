import React, { useContext, useEffect, useState } from "react";
import Title from "./Title.jsx";
import { shopDataContext } from "../context/ShopContext.jsx";
import Card from "./Card.jsx";

const LatestCollection = () => {
    let {products} = useContext(shopDataContext)
    const [latestProducts, setLatestProducts] = useState([])

    useEffect(()=>{
        setLatestProducts(products.slice(0,4))
    },[products])

  return (
    <div>
      <div className="h-[8%] w-full text-center md:mt-12.5">
        <Title text1={'LATEST'} text2={'COLLECTIONS'}/>
        <p className="w-full m-auto text-[13px] md:text-[20px] px-2.5 text-blue-100">
            Step Into Style - New Collection Dropping This Season!</p>
        </div>
        <div className="w-full h-[50%] mt-7.5 flex items-center justify-center flex-wrap gap-12">{
            latestProducts.map((item,index)=>(
                <Card key={index} name={item.name} image={item.image1} id={item._id} price={item.price}/>
            ))
            }</div>
    </div>
  );
};

export default LatestCollection;
