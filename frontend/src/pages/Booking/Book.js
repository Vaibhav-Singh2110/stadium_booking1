import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "./Book.css";
import { useSelector } from 'react-redux';
import user from './user.jpg'
// const Stadium = require('../models/stadium')
const Book = () => {
  const InputRef = useRef();
  const [stadiumData, setStadiumData] = useState([]);
  const [specific, setSpecific] = useState([]);
  const[price,setPrice] = useState("");
  const[size,setSize] = useState("")
  const[description,setDescription] = useState("")
  const[availability,setAvailability] = useState("")
  const[book,setBook] = useState("");

  const config = {
    //sending auth-toke to frontend also
    headers: {
      "auth-token": localStorage.getItem("token"),
    },
  };
  const email= useSelector((store)=>store.users.email)
  useEffect(() => {
    axios
      .get("/api/add/listStadium", config)
      .then((response) => {
        console.log("Search query ", response.data);

        setStadiumData(response.data);
        // console.log(stadiumData)
        // console.log(stadiumData.length)
      });
  }, []);

  const handleSubmit = async (e) => {
    // console.log("searched_param",InputRef.current.value);
    e.preventDefault();
    try {
      const res = await axios
        .get(
          `/api/book/search/${InputRef.current.value}`,
          config
        )
        .then((response) => {
          setSpecific(prevData =>response.data);
          let data= response.data;
          setPrice(data[0].price)
            setSize(data[0].size)
            setDescription(data[0].description)
            setAvailability(data[0].availability)
          console.log("Search result ", response.data);
          console.log(specific);
        });

    } catch (err) {
      console.log(err);
    }
  };
  const handleClick=()=>{
    console.log("HanleClick")
    // setPrice(specific[0].price)
    // setSize(specific[0].size)
    // setDescription(specific[0].description)
    // setAvailability(specific[0].availability)
  }

  const routeChange =async(e)=>{
    e.preventDefault();
    // console.log("456");
    window.location ="https://www.yepdesk.com/embed/buy-tickets/63c7a117c9e77c0001453795/private/5etg5a4sma"
    // console.log(specific)
    let data = await axios.get(`/api/add/getAvailability/${InputRef.current.value}`,
    config).then((response)=>{
      setBook(response.data);
      console.log(book);
    })
    try{
      const userbooking = {
        email:email,
        stadium_name:specific[0].stadium_name,
        price:specific[0].price,
        state:specific[0].state,
        BookedAt:new Date()
        
      }

      let message = await axios.post("/api/book/CustomerBookings",userbooking,config)
      console.log("customer booking",message)
      

      const a=InputRef.current.value;
      console.log(a);
      // console.log(stadiumData)
      let update = await axios.post(`/api/add/updateStadium/${InputRef.current.value}`,a,config)
      console.log("update",update)

    }
    catch(err){
      console.log(err);
    }
  }
  return (
    <div>
      <img src ={user} className="book-img"></img> 
      <form className="BookUI" onSubmit={handleSubmit} >
      <h2>BOOK STADIUM</h2>
      <div className="scrollBook">
        <div className="form-group SelectBox" >
          <label for="exampleFormControlSelect1">Select State</label>

          {/* using useRef because useState is updating the data after updating the first data */}
          <select
            className="form-control"
           
            
            name="search"
          >
            {/* console.log(stadiumData.length) */}
            {stadiumData.map((stadi, key) => (
              <option key={key}>{stadi.state}</option>
            ))}
          </select>
        </div>

        <div className="form-group SelectBox">
          <label for="exampleFormControlSelect1">Select Stadium</label>
          <select className="form-control"  ref={InputRef}>
            {stadiumData.map((stadi, key) => (
              <option key={key}>{stadi.stadium_name}</option>
            ))}
          </select>
        </div>
        <br></br>
        <button type="submit" className="btn btn-primary" onClick={handleClick}>
          Search
        </button>
        <div className="SelectBox">
    <p>Price:{price}</p>
    <p>Size:{size}</p>
    <p>Description:{description}</p>
    <p>Availability:{availability}</p>
    {availability==="No"?<p>Not available for booking right now. Search for any other stadium</p>:<p>Available for booking.Pay and Book Now!</p>}
  </div>
<br></br>
  <button disabled={availability==="No"}type="submit" className="btn btn-primary" onClick={routeChange}>
          BOOK
        </button>
        </div>
      </form>
      
      
    </div>
  );
};

export default Book;
