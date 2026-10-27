import React, { useContext, useState } from "react";
import logo from "../assets/vcart logo.png";
import { IoSearchCircleOutline } from "react-icons/io5";
import { FaCircleUser } from "react-icons/fa6";
import { MdOutlineShoppingCart } from "react-icons/md";
import { userDataContext } from "../context/UserContext.jsx";
import { IoSearchCircle } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { authDataContext } from "../context/AuthContext.jsx";
import axios from "axios";
import { IoMdHome } from "react-icons/io";
import { HiOutlineCollection } from "react-icons/hi";
import { MdContacts } from "react-icons/md";
import { shopDataContext } from "../context/ShopContext.jsx";
import { toast } from 'react-toastify'

const Navbar = () => {
  const navigate = useNavigate();

  let { userData, setUserData } = useContext(userDataContext);

  const {showSearch, setShowSearch, search,setSearch , getCartCount} = useContext(shopDataContext);
  const [showProfile, setShowProfile] = useState(false);
  const {serverUrl} = useContext(authDataContext);

 const handleLogout = async () => {
  try {
    await axios.get(serverUrl + "/api/auth/logout", {
      withCredentials: true,
    });

    setUserData(null);
    setShowProfile(false);
    toast.success("Logout Success");
    navigate("/login");
  } catch (error) {
    console.log(error);
    toast.error("Logout Failed");
  }
};
  return (
   
      <div
        className="w-full h-15 bg-[#ecfafaec] z-10 fixed top-0 flex items-center 
    justify-between px-7.5 shadow-md shadow-black "
      >
        {/* // logo&heading */}
        <div className="w-7.5 flex items-center justify-start gap-2.5">
          <img src={logo} alt="" className="w-7.5" />
          <h1 className="text-[20px]  text-black font-sans">OneCart</h1>
        </div>

        {/* title and mid part */}

        <div className="w-130 hidden md:flex">
          <ul className="flex items-center justify-center gap-2.5 text-white ">
            <li className="text-[15px] hover:bg-slate-500 cursor-pointer bg-[#000000c9] py-2 px-5 rounded-2xl "
            onClick={()=> navigate('/')}>
              HOME
            </li>
            <li className="text-[15px] hover:bg-slate-500 cursor-pointer bg-[#000000c9] py-2 px-5 rounded-2xl "
            onClick={()=> navigate('/collections')}>
              COLLECTIONS
            </li>
            <li className="text-[15px] hover:bg-slate-500 cursor-pointer bg-[#000000c9] py-2 px-5 rounded-2xl " onClick={()=> navigate('/about')}>
              ABOUT
            </li>
            <li className="text-[15px] hover:bg-slate-500 cursor-pointer bg-[#000000c9] py-2 px-5 rounded-2xl" 
            onClick={()=> navigate('/contact')}>
              CONTACT
            </li>
          </ul>
        </div>

        <div className="w-auto flex items-center justify-end gap-5 text-black">
          {!showSearch && (
            <IoSearchCircleOutline
              size={30}
              className="cursor-pointer"
              onClick={() => {setShowSearch((prev) => !prev); navigate('/collections')}}
            />
          )}
          {showSearch && (
            <IoSearchCircle
              size={30}
              className="cursor-pointer"
              onClick={() => setShowSearch((prev) => !prev)}
            />
          )}
          {!userData && <FaCircleUser size={22} className="cursor-pointer" onClick={() => setShowProfile((prev) => !prev)}/>}
          {userData && (
            <div
              className="bg-[#080808] text-white rounded-full flex items-center text-[15px] h-7 w-7
             justify-center cursor-pointer"
              onClick={() => setShowProfile((prev) => !prev)}
            >
              {userData?.name.slice(0, 1)}
            </div>
          )}
          <MdOutlineShoppingCart size={25} className="cursor-pointer hidden md:block" onClick={()=> navigate('/cart')}/>
          <p className="absolute w-auto h-auto items-center justify-center bg-black px-1.25 py-px text-white rounded-full text-[9px] top-2 right-5 hidden md:block">
            
           {getCartCount()} 
          </p>
        </div>

        {showSearch && (
          <div className="w-full h-15  bg-[#d8f6f9dd] absolute top-full left-0 right-0 flex items-center justify-center">
            <input
              type="text"
              className="lg:w-1/2 w-[80%] h-10 bg-[#233533] rounded-[30px] px-7.5
            placeholder:text-gray  text-white text-[18px] "
              placeholder="Search" onChange={(e)=> {setSearch(e.target.value)}} value={search}
            />
          </div>
        )}

        {showProfile && (
          <div className="absolute w-47 h-40 bg-[#000000d7] top-[110%] right-[4%] border border-[#aaa9a9] rounded-[10px] z-10 ">
            <ul className="w-full h-full flex items-start justify-around flex-col text-[17px] py-2.5 text-white ">
              {!userData && (
                <li
                  className="w-full hover:bg-[#2f2f2f] px-3.75 py-2.5 cursor-pointer text-gray-400"
                  onClick={() => {
                    navigate("/login");
                    setShowProfile(false);
                  }}
                >
                  LogIn
                </li>
              )}
              {userData && (
                <li className="w-full hover:bg-[#2f2f2f] px-3.75 py-2.5 cursor-pointer text-gray-400"
                onClick={handleLogout()}
                >
                  LogOut
                </li>
              )}
              <li
                className="w-full hover:bg-[#2f2f2f] px-3.75 py-2.5 cursor-pointer text-gray-400"
                onClick={() => {
                  navigate("/order");
                  setShowProfile(false);
                }}
              >
                Orders
              </li>
              <li className="w-full hover:bg-[#2f2f2f] px-3.75 py-2.5 cursor-pointer text-gray-400 " onClick={()=> {
                navigate("/about")
                setShowProfile(false)
              }}>
                About
              </li>
            </ul>
          </div>

        )}

        <div className="w-full h-22.5 flex items-center justify-between px-5 fixed bottom-0 left-0 bg-[#191818] md:hidden text-[12px]">
            <button className="text-white flex items-center justify-center flex-col gap-1"> 
                <IoMdHome className="w-6 h-6 text-white md:hidden" onClick={()=>navigate('/')}/>
                 Home
                 </button>
                 <button className="text-white flex items-center justify-center flex-col gap-1"> 
                <HiOutlineCollection className="w-6 h-6 text-white md:hidden" onClick={()=> navigate('/collections')}/>
                 Collections
                 </button>
                 <button className="text-white flex items-center justify-center flex-col gap-1"> 
                <MdContacts className="w-6 h-6 text-white md:hidden" onClick={()=>navigate('/contact')}/>
                 Contact
                 </button>
                 <button className="text-white flex items-center justify-center flex-col gap-1">
                 <MdOutlineShoppingCart className="w-6 h-6 text-white md:hidden" onClick={()=> navigate('/cart')}/> Cart
                 </button>
                 <p className="absolute w-auto h-auto flex items-center justify-center
                  bg-white px-1.25 py-px text-black font-semibold rounded-full text-[9px] 
                  top-3 right-3">
            {getCartCount()} 
            
          </p>

        </div>
      </div>

     
  
  );
};

export default Navbar;
