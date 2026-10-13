import React, { useState , useContext } from "react";
import Logo from "../assets/vcart logo.png";
import { useNavigate } from "react-router-dom";
import google from "../assets/Google.png";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeSharp } from "react-icons/io5";
import { authDataContext } from "../context/AuthContext.jsx";
import axios from 'axios'
import { signInWithPopup } from "firebase/auth";
import {auth, provider } from "../../utils/Firebase.js";
import { userDataContext } from "../context/UserContext.jsx";
import { toast } from "react-toastify";


function login(){
    const [show, setShow] = useState(false);
    let { serverUrl } = useContext(authDataContext);
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const [loading, setLoading] = useState(false)

      let {getCurrentUser} = useContext(userDataContext);

    const navigate = useNavigate();
    const handleLogin = async(e)=>{
      setLoading(true)
      e.preventDefault();
      try {
        const result = await axios.post(serverUrl + '/api/auth/login',{
          email,password

        },{withCredentials:true})
        console.log(result.data)
        setLoading(false)
        toast.success("Login Successfully")
        getCurrentUser()
        navigate("/")
      } catch (error) {
        console.log("error" , error)
        setLoading(false)
        toast.error("Login Failed")
      }
    }

    const googleLogin = async () => {
      setLoading(true)
  try {
    const response = await signInWithPopup(auth, provider);

    const user = response.user;

    const name = user.displayName;
    const email = user.email;

    if (!email) {
      console.log("Google account se email nahi mila");
      return;
    }

    const result = await axios.post(
      serverUrl + "/api/auth/googlelogin",
      {
        name,
        email
      },
      {
        withCredentials: true
      }
    );

    console.log(result.data);
    setLoading(false)
    toast.success("Login Success")
    getCurrentUser();
    navigate("/")

  } catch (error) {
    console.log(error);
    toast.error("Login Failed")
  }
};


    return (
      <div className="w-screen h-screen bg-linear-to-l from-[#141414] to-[#0c2025] text-[white] flex flex-col items-center justify-start">
        <div
          className="w-full h-20 flex items-center justify-start px-7.5 gap-2.5 cursor-pointer"
          onClick={() => navigate("/")} 
        >
          <img className="w-10" src={Logo} alt="Brand Image" />
          <h1 className="text-[22px] font-sans">One Cart</h1>
        </div>
  
        <div className="w-full h-25 flex items-center justify-center flex-col gap-2.5">
          <span className="text-[25px] font-semibold">Registration Page</span>
          <span className="text-[16px] ">
            Welcome to One Cart, Place your order
          </span>
        </div>
        <div className="max-w-150 w-[90%] h-125 bg-[#00000025] border border-[#96969635] backdrop-blur-2xl rounded-lg shadow-lg flex items-center justify-center">
          <form
            action="" onSubmit={(handleLogin)}
            className="w-[90%] h-[90%] flex flex-col items-center justify-start gap-5"
          >
            {/* Google Button */}
            <div className="w-[90%] h-12.5 bg-[#42656cae] rounded-lg flex items-center justify-center gap-2.5 cursor-pointer" onClick={googleLogin}>
              <img className="w-5" src={google} alt="" />
              Registration with Google
            </div>
  
            {/* OR */}
            <div className="w-full flex items-center justify-center gap-2.5">
              <div className="w-[40%] h-px bg-[#96969635]"></div>
              <span>Or</span>
              <div className="w-[40%] h-px bg-[#96969635]"></div>
            </div>
  
            {/* Inputs */}
            <div className="w-[90%] flex flex-col gap-3.75 relative mt-7">
              
              <input
                type="email"
                className="w-full h-12.5 border-2 border-[#96969635] backdrop-blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-5 font-semibold"
                placeholder="Email"
                required value={email}onChange={(e) => setEmail(e.target.value)}
              />
  
              <input
                type={show ? "text":"password"}
                className="w-full h-12.5 border-2 border-[#96969635] backdrop-blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-5 font-semibold"
                placeholder="Password"
                required value={password}onChange={(e) => setPassword(e.target.value)}
              />
              {!show && <IoEyeOutline className="w-5 h-5 cursor-pointer absolute right-[5%] top-[34%]" onClick={() => setShow(prev => !prev)}/>}
              {show && <IoEyeSharp className="w-5 h-5 cursor-pointer absolute right-[5%] top-[34%]" onClick={() => setShow(prev => !prev)}/>}
  
  
              <button className="w-full h-12.5 bg-[#6060f5] rounded-lg flex items-center justify-center mt-5 text-[17px] font-semibold"> Login</button>
              <p className="flex gap-2.5 justify-center">Don't have an account?<span className="text-[#5555f6cf] text-[17px] font-semibold cursor-pointer" onClick={()=> navigate("/signup")}>Sign up</span></p>
            </div>
          </form>
        </div>
      </div>
    );
}

export default login