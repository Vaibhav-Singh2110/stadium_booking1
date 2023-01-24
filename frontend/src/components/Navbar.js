import React from 'react'
import{Link} from 'react-router-dom'
import { useSelector } from 'react-redux';
import './Navbar.css'
export default function Navbar() {
  
  const islogin= useSelector((store)=>store.users.login);
  const role = useSelector((store)=>store.users.type_of_user)
  // console.log(role)
  const handleLogout=()=>{   
    localStorage.removeItem("token");
    window.location.replace("/login");
  }

  if(role === "ADMIN"){
    return(
      <>
  
         <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
  <a className="navbar-brand translate-middle" href="#" >Online Stadium Booking System</a>
 

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item active">
        <a className="nav-link"><Link to="/admin">Home </Link><span className="sr-only">(current)</span></a>
      </li>

      <li className="nav-item active">
        <a className="nav-link"><Link to="/addStadium">Add New Stadiums</Link><span className="sr-only">(current)</span></a>
      </li>
      
      <li className="nav-item active">
        <a className="nav-link"><Link to="/ListStadium">Manage Stadiums </Link><span className="sr-only">(current)</span></a>
      </li>

      <li className="nav-item active">
        <a className="nav-link"><Link to="/ListStadium">All Stadiums</Link><span className="sr-only">(current)</span></a>
      </li>
    </ul>
    {!islogin?
    <form className="d-flex">
      <Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link>
      <Link className="btn btn-primary mx-1" to="/register" role="button">SignUp</Link></form>:
      <button className="btn btn-primary mx-1" onClick={handleLogout} >Logout</button>
    }
    
    
   </div>
</nav>

      </>
    )
  }
  if(role == "USER"){
    return (
      <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
    <a className="navbar-brand translate-middle" href="#" >Online Stadium Booking System</a>
   
  
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item active">
          <a className="nav-link"><Link to="/customer">Home </Link><span className="sr-only">(current)</span></a>
        </li>
        <li className="nav-item active">
          <a className="nav-link"><Link to="/book">Book Stadium</Link><span className="sr-only">(current)</span></a>
        </li>
        <li className="nav-item active">
          <a className="nav-link"><Link to="/bookings">My Bookings </Link><span className="sr-only">(current)</span></a>
        </li>
        
      </ul>
      {!islogin?
      <form className="d-flex">
        <Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link>
        <Link className="btn btn-primary mx-1" to="/register" role="button">SignUp</Link></form>:
        <button className="btn btn-primary mx-1" onClick={handleLogout} >Logout</button>
      }
      
      
     </div>
  </nav>
      </>
    )
    
    }
    else{
      return (
        <>
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <a className="navbar-brand translate-middle nav-head" href="#" >Online Stadium Booking System</a>
     
    
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <a className="nav-link"><Link to="/">Home </Link><span className="sr-only">(current)</span></a>
          </li>
        </ul>
        {!islogin?
        <form className="d-flex">
          <Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link>
          <Link className="btn btn-success primary mx-1" to="/register" role="button">SignUp</Link></form>:
          <button className="btn btn-primary mx-1" onClick={handleLogout} >Logout</button>
        }
        
        
       </div>
    </nav>
        </>
      )
    
  }
 
}
