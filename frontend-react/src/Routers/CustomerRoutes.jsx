import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from '../customers/pages/Home/HomePage'
import Navbar from '../customers/components/Navbar/Navbar'
import Cart from '../customers/pages/Cart/Cart'
import Profile from '../customers/pages/Profile/Profile'
import PaymentSuccess from '../customers/pages/PaymentSuccess/PaymentSuccess'
import Search from '../customers/components/Search/Search'
import CreateFestForm from '../Admin/AddFests/CreateFestForm'
import Fest from '../customers/pages/Fest/Fest'
import PasswordChangeSuccess from '../customers/pages/Auth/PasswordChangeSuccess'
import NotFound from '../customers/pages/NotFound/NotFound'



const CustomerRoutes = () => {
  return (
    <div className='relative'>
        <nav className="sticky top-0 z-50">
            <Navbar/>
        </nav>
        <Routes>
            <Route exact path='/' element={<HomePage/>}/>
            <Route exact path='/account/:register' element={<HomePage/>}/>
            <Route exact path='/fest/:city/:title/:id' element={<Fest/>}/>
            <Route path='/cart' element={<Cart/>}/>
            <Route path='/payment/success/:id' element={<PaymentSuccess/>}/>
            <Route path='/my-profile/*' element={<Profile/>}/>
            <Route path='/search' element={<Search/>}/>
            <Route path='/admin/add-fest' element={<CreateFestForm/>}/>
            <Route exact path='/password_change_success' element={<PasswordChangeSuccess/>}/>
            <Route exact path='/*' element={<NotFound/>}/>
        </Routes>
    </div>
  )
}

export default CustomerRoutes