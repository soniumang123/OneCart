import React, { useContext, useState } from 'react'
import ai from '../assets/ai.png'
import { shopDataContext } from '../context/ShopContext.jsx'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import open from "../assets/open.mp3"


const Ai = () => {
    let {showSearch,setShowSearch} = useContext(shopDataContext)
    let navigate = useNavigate()
    let openingSound = new Audio(open)
    
    const [activeAi, setActiveAi] = useState(false)

    function speak(message){
        let utterence = new SpeechSynthesisUtterance(message)
        window.speechSynthesis.speak(utterence)
    }
    const speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = new speechRecognition()
    if(!recognition){
        console.log("not Supported")
        toast.error("not Supported")
    }

    recognition.onresult = (e)=>{
        const transcript = e.results[0][0].transcript.trim();
        if(transcript.toLowerCase().includes("search") && transcript.toLowerCase().includes("open") && !showSearch){
            speak("opening search")
            setShowSearch(true)
            navigate("/collections")
        }else if(transcript.toLowerCase().includes("search")&& transcript.toLowerCase().includes("close") && showSearch){
            speak("closing search")
            setShowSearch(false)
        }else if(transcript.toLowerCase().includes("collection") || transcript.toLowerCase().includes("collections") || transcript.toLowerCase().includes("product") || transcript.toLowerCase().includes("products"))
            {
                speak("opening collection page")
                navigate("/collections")
        }else if(transcript.toLowerCase().includes("about") || transcript.toLowerCase().includes('aboutpage')){
            speak("opening about page");
            navigate("/about")
            setShowSearch(false)
        }else if(transcript.toLowerCase().includes("home") || transcript.toLowerCase().includes('homepage')){
            speak("opening home page");
            navigate("/")
             setShowSearch(false)
        }else if(transcript.toLowerCase().includes("cart") || transcript.toLowerCase().includes("kaat") || transcript.toLowerCase().includes("caat") || transcript.toLowerCase().includes("card"))
            {
                
                speak("opening your cart")
                navigate("/cart")
                setShowSearch(false)
        }else if(transcript.toLowerCase().includes("order") || transcript.toLowerCase().includes("orders") || transcript.toLowerCase().includes("myorder") || transcript.toLowerCase().includes("myorders"))
            {
                speak("opening orders page")
                navigate("/order")
                setShowSearch(false)
        }else if(transcript.toLowerCase().includes("contact")){
            speak("opening contact page");
            navigate("/contact")
            setShowSearch(false)
        }else{
            console.log(transcript)
            toast.error("Try Again")
        }
        
    }
    recognition.onend=()=>{
        setActiveAi(false)
        
    }
  return (
    <div className='fixed lg:bottom-5 md:bottom-10 bottom-20 left-[2%]' onClick={()=>{ recognition.start();
        openingSound.play(); setActiveAi(true)
    }}>
        <img src={ai} alt="" className={`w-25 cursor-pointer ${activeAi ? 'translate-x-[10%] translate-y-[-10%] scale-125' : 'translate-x-0 translate-y-0 scale-100'} translate-transform`} style={{filter: `${activeAi?"drop-shadow(0px 0px 30px #00d2fc)": "drop-shadow(0px 0px 20px black)"}`}} />
    </div>
  )
}

export default Ai