import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/vcart logo.png'
import axios from 'axios'
import { authDataContext } from '../context/AuthContext.jsx'
import { adminDataContext } from '../context/AdminContext.jsx'
import { toast } from 'react-toastify'

const Navbar = () => {
    let navigate = useNavigate()
    const {serverUrl} = useContext(authDataContext)
    let {getAdmin} = useContext(adminDataContext)
    
    const logout = async()=>{
        try {
            const result = await axios.get(serverUrl + '/api/auth/logout',{
                withCredentials:true
            })
            console.log(result.data)
            toast.success("Logout Success")
            getAdmin()
            navigate("/login")
        } catch (error) {
            console.log(error)
            toast.error("Logout Failed")
        }
    }
  return (
    <div className='w-full h-17.5 bg-[#dcdbdbf8] z-10 fixed top-0 flex items-center 
    justify-between px-7.5 overflow-x-hidden shadow-md shadow-black'>
        <div className='w-[30%] flex items-center justify-start gap-2.5 cursor-pointer' onClick={()=> navigate('/')}>
            <img src={logo} alt= "" className='w-7.5'/>
            <h1 className='text-[25px] text-black font-sans'>One Cart</h1>

            
        </div>
        <button className='text-[15px] hover:border border-[#89daea] 
            cursor-pointer bg-[#000000ca] py-2.5 px-5 rounded-2xl text-white' onClick={logout}>Logout
            </button>
        </div>
  )
}

export default Navbar