import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Navbar from './components/Navbar'
import Home from './pages/HOME/Home'
import AddStadium from './pages/ManageStadium/AddStadium'
import ListStadium from './pages/ManageStadium/ListStadium'
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import Book from './pages/Booking/Book';
import AdminPage from './pages/ManageStadium/AdminPage';
import CustomerPage from './pages/Booking/CustomerPage';
import { useSelector } from 'react-redux';
import AllBookings from './pages/Booking/AllBookings';
export default function App() {
  const islogin= useSelector((store)=>store.users.login);
  const role = useSelector((store)=>store.users.type_of_user)
  console.log("Type_of_user:", role)
  return (
    <>

    
    <Router>

    <Navbar></Navbar>
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      {/* <Route path ='/addStadium' element={<AddStadium/>}></Route> */}
      {/* <Route path ='/admin' element={<AdminPage/>}></Route> */}
      {islogin? <Route path ='/admin' element={<AdminPage/>}></Route>:<Route path='/admin' element={<Login/>}/>}
      {islogin? <Route path ='/customer' element={<CustomerPage/>}></Route>:<Route path='/customer' element={<Login/>}/>}

      {islogin && role === "ADMIN"? <Route path ='/red' element={<AdminPage/>}></Route>:<Route path='/admin' element={<Login/>}/>}
      {islogin && role === "USER"? <Route path ='/red' element={<CustomerPage/>}></Route>:<Route path='/customer' element={<Login/>}/>}

      {/* <Route path ='/ListStadium' element={<ListStadium/>}></Route> */}
      {islogin? <Route path ='/book' element={<Book/>}></Route>:<Route path='/book' element={<Login/>}/>}
      {islogin? <Route path ='/bookings' element={<AllBookings/>}></Route>:<Route path='/bookings' element={<Login/>}/>}

      {islogin? <Route path ='/addStadium' element={<AddStadium/>}></Route>:<Route path='/addStadium' element={<Login/>}/>}
      {islogin? <Route path ='/ListStadium' element={<ListStadium/>}></Route>:<Route path='/ListStadium' element={<Login/>}/>}
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/> 
      {/* <Route path='/Bookings' element={<Bookings/>}/>  */}
     </Routes> 
    </Router>
     {/* <AddStadium></AddStadium> */}
    {/* <ListStadium></ListStadium>  */}
{/* <Book></Book> */}
{/* <AllBookings></AllBookings> */}

    </>
  )
}

