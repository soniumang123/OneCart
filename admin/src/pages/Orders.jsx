import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../component/Navbar.jsx'
import Sidebar from '../component/Sidebar.jsx'
import { authDataContext } from '../context/AuthContext.jsx'
import axios from 'axios'
import { SiEbox } from "react-icons/si";


const Orders = () => {
  const [orders, setOrders] = useState([])
  let {serverUrl} = useContext(authDataContext)

  const fetchAllOrders = async()=>{
    try {
      const result = await axios.post(serverUrl + '/api/order/list',{},{withCredentials:true})
      setOrders(result.data.reverse())
      console.log(result.data.reverse())
    } catch (error) {
      console.log(error)
    }
  }

  const statusHandler = async(e,orderId)=>{
    try {
      const result = await axios.post(serverUrl + '/api/order/status' , {orderId,status:e.target.value},{withCredentials:true})
      if(result.data){
        await fetchAllOrders()
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    fetchAllOrders(),statusHandler();
  },[])
  return (
    
    <div className='w-full min-h-screen bg-linear-to-l from-[#141414] to-[#0c2025] text-white'>
      <Navbar/>
      <div className='w-full h-full flex items-center lg:justify-start'>
        <Sidebar/>
        <div className='lg:w-[85%] md:w-[70%] h-full lg:ml-85  md:ml-65 mt-17 flex flex-col gap-7.5 overflow-x-hidden py-12.5 ml-25'>
          <div className='w-100 h-12.5 text-[28px] md:text-[40px] mb-5 text-white'>All Orders List</div>

          {
            orders.map((order,index)=>(
              <div key={index} className='w-[90%] h-[40%] bg-slate-600 rounded-xl flex lg:items-center items-start justify-between flex-col lg:flex-row p-2.5 md:px-5 gap-5'>
                <SiEbox className='w-15 h-15 text-black p-2 rounded-lg bg-white'/> 

                <div>
                  <div className='flex items-start justify-center flex-col gap-2 text-[16px] text-[#56dbfc]'>
                    {
                      order.items.map((item,index)=>{
                        if(index === order.items.length -1){
                          return <p className='text-[20px] font-semibold' key={index}>{item.name.toUpperCase()} * {item.quantity} <span>{item.size}</span></p>
                        }else{
                          return <p className='text-[20px] font-semibold' key={index}>{item.name.toUpperCase()} * {item.quantity} <span>{item.size}</span>,</p>

                        }
                      })
                    }

                  </div>

                  <div className='text-green-100 text-[15px] md:w-[25vw] w-full '>
                    <p className='w-full'>{order.address.firstName + " " + order.address.LastName}</p>
                    <p>{order.address.street + ', '}</p>
                    <p>{order.address.city+', ' + order.address.state+ ', ' + order.address.country + ', ' + order.address.pincode}</p>
                    <p>{order.address.phone}</p>
                  </div>

                  
                </div>
                <div className='text-[15px] text-green-100 md:w-[10vw] w-full'>
                    <p>Items : {order.items.length}</p>
                    <p>Method : {order.paymentMethod} </p>
                    <p>Payment : {order.payment ? 'Done' : 'Pending'} </p>
                    <p>Date : {new Date(order.date).toLocaleDateString()}</p>
                    <p className='text-[20px] '>Price : ₹{order.amount}</p>
                  </div>
                  <select onChange={(e)=> statusHandler(e,order._id)} value={order.status} className='px-2 py-2.5 bg-slate-500 rounded-lg border border-[#96eef3]'>
                    <option value="Order Placed">Order Placed</option>
                    <option value="Packing">Packing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Out for delivery">Out for delivery</option>
                    <option value="Delivered">Delivered</option>
                  </select>
              </div>
            ))
          }

        </div>
      </div>
    </div>
    
  )
}

export default Orders