import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../component/Navbar.jsx'
import Sidebar from '../component/Sidebar.jsx'
import { authDataContext } from '../context/AuthContext.jsx'
import axios from 'axios'

const home = () => {
  const [totalProducts , setTotalProducts] = useState(0)
  const [totalOrders , setTotalOrders] = useState(0) 

  const {serverUrl} = useContext(authDataContext)

  const fetchCounts = async()=>{
    try {
      const products = await axios.get(`${serverUrl}/api/product/list`,{},{withCredentials:true})
      setTotalProducts(products.data.length)

      const orders = await axios.post(`${serverUrl}/api/order/list`,{},{withCredentials:true})
      setTotalOrders(orders.data.length);
    } catch (error) {
      console.log("Failed to fetch counts",error)
    }
  }

  useEffect(()=>{
    fetchCounts()
  },[])

  return (
    <div className='w-screen h-screen bg-linear-to-l from-[#141414] to-[#0c2025] text-white'>
        <Navbar/>
        <Sidebar/>

        <div className='w-[70vw] h-screen absolute left-[25%] flex items-start justify-start flex-col gap-10 py-25'>
          <h1 className='text-[35px] text-[#afe2f2] '>OneCart Admin Panel</h1>

          <div className='flex items-center justify-start gap-12 flex-col md:flex-row'>
            <div className='text-[#dcfafd] w-100 max-w-[90%] h-50 bg-[#0000002e] flex items-center justify-center flex-col gap-5 rounded-lg shadow-sm shadow-black backdrop:backdrop-blur-lg md:text-[20px] border border-[#969595]'>Total No. of Products : <span className='px-5 py-2.5 bg-[#030e11] rounded-lg flex items-center justify-center border border-[#969595]'>{totalProducts}</span></div>
            <div className='text-[#dcfafd] w-100 max-w-[90%] h-50 bg-[#0000002e] flex items-center justify-center flex-col gap-5 rounded-lg shadow-sm shadow-black backdrop:backdrop-blur-lg md:text-[20px] border border-[#969595]'>Total No. of Orders : <span className='px-5 py-2.5 bg-[#030e11] rounded-lg flex items-center justify-center border border-[#969595]'>{totalOrders}</span></div>
          </div>
        </div>



    </div>
  )
}

export default home