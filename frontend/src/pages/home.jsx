import React, { useEffect, useState } from 'react'
import Background from '../Components/Background.jsx'
import Hero from '../Components/Hero.jsx'
import Product from './Product.jsx'
import OurPolicy from '../Components/OurPolicy.jsx'
import NewLetterBox from '../Components/NewLetterBox.jsx'
import Footer from '../Components/Footer.jsx'


const home = () => {

  let heroData = [
    {text1:'30% OFF Limited Offer', text2 : "Style that"},
    {text1 : 'Discover the best of Bold Fashion', text2: "Limited Time Only!"},
    {text1 : "Explore Our Best Collection" , text2: "Shop Now!"},
    {text1 : "Choose your Perfect Fashion Fit" , text2 : "Now on Sale!"}
  ]

  const [heroCount, setHeroCount] = useState(0)

  useEffect(()=>{
    let interval = setInterval(()=>{
      setHeroCount(prevCount => (prevCount === 3 ? 0 : prevCount + 1))
    }, 3000)
return ()=> clearInterval(interval)
  },[])
  return (
    <div className='overflow-x-hidden relative top-17.5'>
      <div className='w-full h-screen relative bg-linear-to-l from-[#141414] to-[#0c2025] '>

      <Background heroCount={heroCount}/>
      <Hero
       heroCount={heroCount}
       setHeroCount={setHeroCount}
       heroData={heroData[heroCount]}
      />
      

      </div>
      <Product/>
      <OurPolicy/>
      <NewLetterBox/>
      <Footer/>
    </div>
  )
}

export default home