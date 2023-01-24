import React from 'react'
import Register from '../Register/Register'
// import Login  from '../Login/Login'

import './Home.css'


export default function Home() {
  const routeChange1 = () =>{ 
    window.location="/login"
  }
  let routeChange = () =>{ 
    window.location = "/register";
    // return false;
  }

  return (
    <>
    <div className="head">
    <h1>
  <span>WELCOME TO  </span>
  <div class="message">
    <div class="word1">Stadium</div>
    <div class="word2">Booking</div>
    <div class="word3">System</div>
  </div>
</h1>
    <button className="btn btn-success my-2 btn-lg md-10" onClick={routeChange1} >Login</button> 
    <button className="btn btn-primary my-2 btn-lg"  onClick={routeChange}>Register</button> 
    </div>
    </>
  )
}
