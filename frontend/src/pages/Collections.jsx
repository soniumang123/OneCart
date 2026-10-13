import React, { useContext, useEffect, useState } from 'react'
import { FaAngleRight } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa";
import Title from '../Components/Title.jsx';
import { shopDataContext } from '../context/ShopContext.jsx';
import Card from '../Components/Card.jsx';

const Collections = () => {
  let {products , search,showSearch} = useContext(shopDataContext)
  const [showFilter, setShowFilter] = useState(false)
  const [filterProduct, setFilterProduct] = useState([])
  const [category, setCategory] = useState([])
  const [subcategory, setSubcategory] = useState([])
  const [sortType, setSortType] = useState("relavent")
  const toogleCategory = (e)=>{
    if(category.includes(e.target.value)){
      setCategory(prev=> prev.filter(item=> item!== e.target.value))
    }else{
      setCategory(prev => [...prev,e.target.value])
    }
  }
  const toogleSubCategory = (e)=>{
    if(subcategory.includes(e.target.value)){
      setSubcategory(prev=> prev.filter(item=> item!==e.target.value))
    }else{
      setSubcategory(prev=> [...prev,e.target.value])
    }
  }

  const applyFilter = ()=>{
    let productCopy = products.slice()
    if(showSearch && search){
      productCopy = productCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }
    if(category.length>0){
      productCopy = productCopy.filter(item => category.includes(item.category))
    }
    if(subcategory.length>0){
      productCopy = productCopy.filter(item => subcategory.includes(item.subCategory))
    }
    setFilterProduct(productCopy)
  }

  const sortProduct =(e)=>{
    let fbCopy = filterProduct.slice()
    switch(sortType){
      case 'low-high':
      setFilterProduct(fbCopy.sort((a,b)=>(a.price - b.price)))
      break;
      case 'high-low':
      setFilterProduct(fbCopy.sort((a,b)=>(b.price - a.price)))
      break;
      default:
        applyFilter()
        break;
    }
  }

  useEffect(()=>{
    sortProduct()
  },[sortType])

  useEffect(()=>{
    setFilterProduct(products)
  },[products])

  useEffect(()=>{
    applyFilter()
  },[category,subcategory,search,showSearch])


  return (
    <div className='w-full min-h-screen bg-linear-to-l from-[#141414] to-[#0c2025] 
    flex items-start flex-col md:flex-row justify-start pt-15 overflow-x-hidden z-2 pb-20 mb-5'>
      <div className={`md:w-[30vw] lg:w-[20vw] w-screen md:min-h-screen ${showFilter ? 'h-[45vh]' : 'h-[8vh]'}
       p-5 border-r border-gray-400 text-[#aaf5fa] lg:fixed `}>
        <p className='text-[25px] font-semibold flex gap-2 items-center justify-start mt-5 cursor-pointer' onClick={()=> setShowFilter(prev=> !prev)}>FILTERS
          {!showFilter && <FaAngleRight className='text-[18px] md:hidden'/>}
          {showFilter && <FaAngleDown   className='text-[18px] md:hidden' />}
        </p>

        <div className={`border-2 border-[#dedcdc] pl-5 py-3 mt-6 rounded-md bg-slate-600 ${showFilter ? '' : 'hidden'} md:block`}>
          <p className='text-[18px] text-[#f8fafa]'>CATEGORIES</p>
          <div className='w-60 h-30 flex items-start justify-center gap-2.5 flex-col'>
            <p className='flex items-center justify-center gap-2.5 tex-[16px] font-light'>
              <input type="checkbox" value={"Men"} className='w-3 cursor-pointer'  onChange={toogleCategory}/>Men</p>
              <p className='flex items-center justify-center gap-2.5 tex-[16px] font-light'>
              <input type="checkbox" value={"Women"} className='w-3 cursor-pointer' onChange={toogleCategory} />Women</p>
              <p className='flex items-center justify-center gap-2.5 tex-[16px] font-light'>
              <input type="checkbox" value={'Kids'} className='w-3 cursor-pointer' onChange={toogleCategory} />Kids</p>

          </div>
        </div>
        <div className={`border-2 border-[#dedcdc] pl-5 py-3 mt-6
        rounded-md bg-slate-600 ${showFilter ? '' : 'hidden'} md:block`}>
          <p className='text-[18px] text-[#f8fafa'>SUB-CATEGORIES</p>
          <div className='w-60 h-30 flex items-start justify-center gap-2.5 flex-col'>
            <p className='flex items-center justify-center gap-2.5 tex-[16px] font-light'>
              <input type="checkbox" value={"TopWear"} className='w-3 cursor-pointer' onChange={toogleSubCategory} />TopWear</p>
              <p className='flex items-center justify-center gap-2.5 tex-[16px] font-light'>
              <input type="checkbox" value={"BottomWear"} className='w-3 cursor-pointer'  onChange={toogleSubCategory}/>BottomWear</p>
              <p className='flex items-center justify-center gap-2.5 tex-[16px] font-light'>
              <input type="checkbox" value={'WinterWear'} className='w-3 cursor-pointer'  onChange={toogleSubCategory}/>WinterWear</p>

          </div>
        </div>
       </div>
       <div className='lg:pl-[20%] md:py-2.5'>
        <div className='lg:w-[80vw] w-full p-5 flex justify-between flex-col lg:flex-row lg:px-12.5 sm:text-[10px] '>
          <Title text1={"ALL "} text2={'COLLECTIONS'}/>

          <select name="" className='bg-slate-600 w-[60%] md:w-50 h-12 px-2.5 text-[16px] text-white rounded-lg hover:border-[#46d1f7] border-2' id="" onChange={(e) => setSortType(e.target.value)}>
            <option value="relavent" className='w-full h-full'>Sort By : Relavent</option>
            <option value="low-high" className='w-full h-full'>Sort By : Low to High</option>
            <option value="high-low" className='w-full h-full'>Sort By : High to Low</option>
          </select>
        </div>
        <div className='lg:w-[80vw] md:w-[60vw] w-screen min-h-[70vw] flex items-start justify-center flex-wrap gap-7.5'>
          {
            filterProduct.map((item,index)=>(
              <Card key={index} id={item._id} name={item.name} price={item.price} image={item.image1}/>
            ))

            
          }
        </div>
       </div>
      </div>
  )
}

export default Collections