
import React from 'react'
import { FaCircle } from "react-icons/fa";

const Hero = ({heroData , heroCount, setHeroCount}) => {
  return (
    <div className='w-[40%] h-full relative'>
        <div className='absolute w-[90%] text-[#88d9ee] text-[20px] md:text-[40px] lg:text-[55px] 
        md:left-[10%] md:top-22.5 lg:top-32.5 left-[10%] top-2.5'>
            <p>{heroData.text1}</p>
            <p>{heroData.text2}</p>
        </div>

        <div className='absolute mg:top-100 lg:top-125 top-40 left-[10%]
         flex items-center justify-center gap-2.5'>
            <FaCircle className={`w-3.5 cursor-pointer ${heroCount === 0?"fill-orange-400":"fill-white"}`} onClick={()=> setHeroCount(0)} />
            <FaCircle className={`w-3.5 cursor-pointer ${heroCount === 1?"fill-orange-400":"fill-white"}`} onClick={()=> setHeroCount(1)} />
            <FaCircle className={`w-3.5 cursor-pointer ${heroCount === 2?"fill-orange-400":"fill-white"}`} onClick={()=> setHeroCount(2)} />
            <FaCircle className={`w-3.5 cursor-pointer ${heroCount === 3?"fill-orange-400":"fill-white"}`} onClick={()=> setHeroCount(3)} />
         </div>
        
        </div>
  )
}

export default Hero
