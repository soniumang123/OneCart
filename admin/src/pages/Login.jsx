import React, { useState, useContext } from "react";
import Logo from "../assets/vcart logo.png";
import { useNavigate } from "react-router-dom";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeSharp } from "react-icons/io5";
import { authDataContext } from "../context/AuthContext.jsx";
import axios from "axios";
import { adminDataContext } from "../context/AdminContext.jsx";
import { toast } from "react-toastify";
import Loading from "../component/Loading.jsx";

const Login = () => {
  const [show, setShow] = useState(false);
  let { serverUrl } = useContext(authDataContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false)

  let {adminData,getAdmin} = useContext(adminDataContext)
  let navigate = useNavigate();

  const adminLogin = async(e)=>{
    e.preventDefault();
    setLoading(true)
    try {
        const result = await axios.post(serverUrl + '/api/auth/adminlogin',{
            email,password
        },{withCredentials:true})
        console.log(result.data)
        setLoading(false)
        toast.success("AdminLogin Successfully")
        getAdmin();
        navigate("/")
    } catch (error) {
        console.log(error)
        toast.error("Admin Login Failed")
        setLoading(false)
    }
    setEmail("")
    setPassword('')

  }
  
  return (
    <div className="w-screen h-screen bg-linear-to-l from-[#141414] to-[#0c2025] text-[white] flex flex-col items-center justify-start">
      <div
        className="w-full h-20 flex items-center justify-start px-7.5 gap-2.5 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img className="w-10" src={Logo} alt="Brand Image" />
        <h1 className="text-[22px] font-sans">One Cart</h1>
      </div>

      
      <div className="max-w-150 w-[90%] h-125 bg-[#00000025] border border-[#96969635] backdrop-blur-2xl rounded-lg shadow-lg flex items-center justify-center mt-10">
        <form
          action="" onSubmit={adminLogin}
          className="w-[90%] h-[80%] flex flex-col items-center justify-start gap-5 "
        >
            <div className="w-full h-25 flex items-center justify-center flex-col gap-2.5">
        <span className="text-[25px] font-semibold">Admin Login Page</span>
        <span className="text-[16px] ">
          Welcome to One Cart,Apply to Admin Login
        </span>
      </div>
          {/* Inputs */}
          <div className="w-[90%] flex flex-col gap-3.75 relative mt-7">
            <input
              type="email"
              className="w-full h-12.5 border-2 border-[#96969635] backdrop-blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-5 font-semibold"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type={show ? "text" : "password"}
              className="w-full h-12.5 border-2 border-[#96969635] backdrop-blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-5 font-semibold"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {!show && (
              <IoEyeOutline
                className="w-5 h-5 cursor-pointer absolute right-[3%] top-[40%]"
                onClick={() => setShow((prev) => !prev)}
              />
            )}
            {show && (
              <IoEyeSharp
                className="w-5 h-5 cursor-pointer absolute right-[3%] top-[40%]"
                onClick={() => setShow((prev) => !prev)}
              />
            )}

            <button className="w-full h-12.5 bg-[#6060f5] rounded-lg flex items-center justify-center mt-5 text-[17px] font-semibold">
              {loading ? <Loading/> : Login}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
