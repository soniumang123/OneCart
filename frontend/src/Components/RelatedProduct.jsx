import React, { useContext, useEffect, useState } from "react";
import { shopDataContext } from "../context/ShopContext.jsx";
import Title from "./Title.jsx";
import Card from "./Card.jsx";

function RelatedProduct({ category, subCategory, currentProductId }) {
  let { products } = useContext(shopDataContext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      let productCopy = products.slice();

      productCopy = productCopy.filter((item) => category === item.category);

      productCopy = productCopy.filter(
        (item) => subCategory === item.subCategory,
      );

      productCopy = productCopy.filter((item) => currentProductId !== item._id);

      setRelated(productCopy.slice(0, 4));
    }
  }, [products, category, subCategory, currentProductId]);
  return (
    <div className="my-27 md:my-10 md:px-15">
      <div className="ml-5 lg:ml-20">
        <Title text1={"RELATED"} text2={"PRODUCT"} />
      </div>
      <div className="w-full mt-7.5 flex items-center justify-center flex-wrap gap-12.5">
        {related.map((item, index) => (
          <Card
            key={index}
            id={item._id}
            name={item.name}
            price={item.price}
            image={item.image1}
          />
        ))}
      </div>
    </div>
  );
}

export default RelatedProduct;
