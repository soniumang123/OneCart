import React from 'react'
import {Route,Routes} from 'react-router-dom'
import Home from './pages/home.jsx'
import Add from './pages/Add.jsx'
import Orders from './pages/Orders.jsx'
import Login from './pages/Login.jsx'
import { useContext } from 'react'
import { adminDataContext } from './context/AdminContext.jsx'
import  List from './pages/List.jsx' 
import { ToastContainer, toast } from 'react-toastify';



const App = () => {
    let{adminData} = useContext(adminDataContext)
  return (
    <>
    <ToastContainer />
        {!adminData ? <Login/>:<>
        

            <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/add' element={<Add/>}/>
            <Route path='/orders' element={<Orders/>}/>
            <Route path='/list' element={<List/>}/>
            <Route path='/login' element={<Login/>}/>
            
        </Routes>
        </>
        }
        </>
  )
}

export default App