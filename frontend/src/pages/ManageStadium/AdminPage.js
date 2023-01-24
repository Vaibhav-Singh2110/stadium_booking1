import React from 'react'
import './AdminPage.css'
import admin from './admin.jpg'
import { useSelector } from 'react-redux';


const AdminPage = () => {
    const name = useSelector((store)=>store.users.name)
    const routeChange = () =>{ 
        window.location="/addStadium"
      }
      const routeChange1 = () =>{ 
        window.location="/ListStadium"
      }
  return (
    <>
    <img src={admin} className="img_edit"></img>
    <div className="admin_wel">
    
    <h1><span>WELCOME BACK! {name}</span></h1>
        <button className="btn btn-success my-2 btn-lg md-10" onClick={routeChange} >Add Stadiums</button> 
    <button className="btn btn-primary my-2 btn-lg" onClick={routeChange1}>Manage Stadiums</button> 
    <button className="btn btn-primary my-2 btn-lg" onClick={routeChange1}>All Stadiums</button> 
    </div> 
    </>
  )
}

export default AdminPage
