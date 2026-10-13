import React, { useContext, useEffect, useState } from 'react'
import Title from './Title.jsx'
import { shopDataContext } from '../context/ShopContext.jsx'
import Card from './Card.jsx'

const BestSeller = () => {
    let {products} = useContext(shopDataContext)
    const [bestSeller, setBestSeller] = useState([])

    useEffect(()=>{
        let filteredProduct = products.filter((item)=> item.bestseller)

        setBestSeller(filteredProduct.slice(0,4))
    },[products])
  return (
    <div className=''>
        <div className='h-[8%] w-full text-center mt-12.5 '>
            <Title text1={"BEST"} text2={'SELLER'}/>
            <p className='w-full m-auto text-[13px] md:text-[20px] px-2.5 text-blue-100'>
                Tried, Tested, Loved Discover Our All-Time Best Sellers.
            </p>
        </div>
        <div className='w-full h-[50%] mt-7.5 flex items-center justify-center flex-wrap gap-12'>
            {
                bestSeller.map((item,index)=>(
                    <Card key={index} name={item.name} id={item._id} price={item.price} image={item.image1}/>
                ))
            }
        </div>
    </div>
  )
}

export default BestSeller