import React, { useContext } from 'react'
import { Navigate, Route, Routes, useLocation, useNavigate  } from 'react-router-dom'
import Registration from './pages/registration.jsx'
import Home from './pages/home.jsx'
import Login from './pages/login.jsx'
import Navbar from './Components/Navbar.jsx'
import { userDataContext } from './context/UserContext.jsx'
import About from './pages/About.jsx'
import Collections from './pages/Collections.jsx'
import Contact from './pages/Contact.jsx'
import Product from './pages/Product.jsx'
import ProductDetals from './pages/ProductDetals.jsx'
import Cart from './pages/Cart.jsx'
import PlaceOrder from './pages/PlaceOrder.jsx'
import Orderss from './pages/Orderss.jsx'
import { ToastContainer, toast } from 'react-toastify';
import NotFound from './pages/NotFound.jsx'
import Ai from './Components/Ai.jsx'




const App = () => {

  const {userData} = useContext(userDataContext)
  let location = useLocation()
 
  return (
    <>
    <ToastContainer />
  {userData && <Navbar/>}
    <Routes>
      <Route path='/login' element={
        userData ? (<Navigate to={location.state?.from || '/'}/>)
        :(<Login/>)
        }/>

      <Route path='/signup'
       element={
        userData ? (<Navigate to={location.state?.from || '/'}/>)
        :(<Registration/>)
        }/>


      <Route path='/'  
      element={userData ? <Home/> :(<Navigate to='/login' state={{from:location.pathname}}/>)}/>
      
      <Route path='/about'  
      element={userData ? <About/> :(<Navigate to='/login' state={{from:location.pathname}}/>)}/>

      <Route path='/collections' 
       element={userData ? <Collections/> :(<Navigate to='/login' state={{from:location.pathname}}/>)}
      />

      <Route path='/contact'  
      element={userData ? <Contact/> :(<Navigate to='/login' state={{from:location.pathname}}/>)}/>

      <Route path='/product' 
       element={userData ? <Product/> :(<Navigate to='/login' state={{from:location.pathname}}/>)}/>

       <Route path='/productdetail/:productId'
       element={userData ? <ProductDetals/> :<Navigate to='/login' state={{from:location.pathname}}/>}/>

        <Route path='/cart'
       element={userData ? <Cart/> :<Navigate to='/login' state={{from:location.pathname}}/>}/>

       <Route path='/placeorder'
       element={userData ? <PlaceOrder/> :<Navigate to='/login' state={{from:location.pathname}}/>}/>

       <Route path='/order'
       element={userData ? <Orderss/> :<Navigate to='/login' state={{from:location.pathname}}/>}/>

       <Route path='*' element={<NotFound/>}/>
     

    </Routes>
    <Ai/>
    </>
  )
}

export default App