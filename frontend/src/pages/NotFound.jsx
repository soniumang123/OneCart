import React from 'react'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
    const navigate = useNavigate();
  return (
    <div className='w-full h-screen md:text-[70px] text-[30px] flex items-center justify-center text-white flex-col gap-5'> 404 Page not Found

    <button className='bg-white px-5 py-2.5 rounded-xl text-[18px] text-black cursor-pointer' onClick={()=> navigate("/login")}>Login</button>
    </div>
    
  )
}

export default NotFound