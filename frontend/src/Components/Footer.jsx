import React from "react";
import logo from "../assets/vcart logo.png";

const Footer = () => {
  return (
    <div className="w-full md:h-[35vh] h-auto mb-19.25 md:mb-0 overflow-hidden">
      <div className="w-full md:h-[38vh] h-[30vh]  bg-[#dbfcfcec] flex items-center justify-center md:px-12.5 px-1">
        <div className="md:w-[35%] w-[45%] h-full flex items-start justify-center flex-col gap-2">
          <div className="flex items-start justify-start gap-2 mt-2.5 md:mt-10">
            <img src={logo} alt="" className="h-7.5 w-7.5 md:w-10 md:h-10 hidden md:block " />
            <p className="text-[19px] md:text-[20px] text-black">One Cart</p>
            
          </div>
          <p className="text-[15px] text-[#1e2223] hidden md:block">OneCart is your all-in-one Online shopping destination,offering top-quality products, unbeatable deals, and fast delivery-all backed by trusted service designed to make your life easier every day.</p>
            <p className="text-[15px] text-[#1e2223] flex md:hidden">Fast. Easy. Realiable. OneCart Shopping</p>
          
        </div>
        <div className="md:w-[25%] w-[25%] h-full flex items-center justify-center flex-col text-center mr-5">
             <div className="flex items-center justify-center gap-2">
                <p className="text-[19px] md:text-[20px] text-[#1e2223] font-sans font-semibold">Company</p>
             </div>
             <ul >
                <li className="text-[14px] text-[#1e2223]  cursor-pointer hidden md:block" >Home</li>
                <li className="text-[14px] text-[#1e2223]  cursor-pointer ">About Us</li>
                <li className="text-[14px] text-[#1e2223]  cursor-pointer ">Delivery</li>
                <li className="text-[14px] text-[#1e2223]  cursor-pointer ">Privacy Policy</li>
             </ul>
          </div>
        
        <div className="w-[25%] md:w-[25%] h-full flex items-center justify-center flex-col text-center mr-8">
            <div className="flex items-center justify-center gap-2 ">
                <p className="text-[19px] md:text-[20px] text-[#1e2223] font-sans font-semibold">Get in Touch</p>
             </div>
             <ul>
                <li className="text-[14px] text-[#1e2223]  cursor-pointer " >+91 9876543233</li>
                <li className="text-[14px] text-[#1e2223]  cursor-pointer whitespace-normal wrap-break-words">contact@Onecart.com</li>
                <li className="text-[14px] text-[#1e2223]  cursor-pointer hidden md:block">+1-123-456-7890</li>
                <li className="text-[14px] text-[#1e2223] cursor-pointer  hidden md:block">admin@onecart.com</li>
             </ul>
        </div>
      </div>
      <div className="w-full h-1 bg-slate-400"></div>
      <div className="w-full h-[5vh] bg-[#dbfcfcec] flex items-center justify-center text-gray-400 px-3 pt-1">
        Copyright 2026@onecart.com-AllRight Reserved </div>
    </div>
  );
};

export default Footer;
