import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../component/Navbar.jsx'
import Sidebar from '../component/Sidebar.jsx'
import { authDataContext } from '../context/AuthContext.jsx'
import axios from 'axios'


const List = () => {
  const [list, setList] = useState([])
  let {serverUrl} = useContext(authDataContext)

  const fetchList = async()=>{
    try {
      let result = await axios.get(serverUrl + '/api/product/list',{withCredentials:true})
      setList(result.data)
      console.log(result.data)
    } catch (error) {
      console.log(error)
    }
  }

  const removeList = async(id) => {

    try {
      let result = await axios.post(`${serverUrl}/api/product/remove/${id}`,{},{withCredentials:true})
      if(result.data){
        fetchList()
      }else{
        console.log('Failed to remove Product')
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchList()
  }, [])
  
  return (
    <div className='w-full min-h-screen bg-linear-to-l from-[#141414] to-[#0c2025] text-white'>
       <Navbar/>
       <div className='w-full h-full flex items-center justify-start'>
        <Sidebar/>

        <div className='w-[82%] h-full lg:ml-80 md:ml-58 mt-18 flex flex-col gap-7.5 overflow-x-hidden py-12.5
        ml-25'>
          <div className='w-100 h-12.5 text-[28px] md:text-[40px] mb-5 text-white'>All Listed Products</div>

          {
            list?.length>0 ? (
              list.map((item,index)=>(
                <div className='w-[90%] md:h-30 h-23 bg-slate-600 rounded-xl 
                flex items-center justify-start gap-2 md:gap-7.5 p-2.5 md:px-7.5' key={index}>
                  <img src={item.image1} className='w-[30%] md:w-30 h-[90%] rounded-lg' alt="" />
                  <div className='w-[90%] h-[80%] flex flex-col items-start justify-center
                  gap-2 '>
                    <div className='w-full md:text-[20px] text-[15px] text-[#bef0f3]'>{item.name}</div>
                    <div className='md:text-[17px] text-[15px] text-[#bef3da]'>{item.category}</div>
                  <div className='md:text-[17px] text-[15px] text-[#bef3da]'>₹{item.price}</div> 
                  </div>
                  <div className='w-[10%] h-full bg-transparent flex items-center justify-center' >
                    <span className='w-9 h-[30%] flex items-center justify-center rounded-md
                    md:hover:bg-red-300 md:hover:text-black cursor-pointer
                     hover:text-red-300' onClick={()=> removeList(item._id)}>X</span>
                  </div>

                </div>
              ))
            ):
            (
              <div className='text-white text-lg'> No Product Available</div>
            )
            
          }
          
  
        </div>
       </div>
    </div>
  )
}

export default List