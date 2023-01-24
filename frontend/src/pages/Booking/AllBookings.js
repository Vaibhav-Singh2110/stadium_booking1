import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import './AllBookings.css'
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { useSelector } from 'react-redux';
import user from './user.jpg'

const AllBookings = () => {
  const [bookingData,setBookingData] = useState([]);
  const email= useSelector((store)=>store.users.email)
  console.log(email)
  const config = {
    //sending auth-toke to frontend also
    headers: {
      "auth-token": localStorage.getItem("token"),
    },
  };


  useEffect(() => {
    
    axios
      .get(`http://localhost:5000/api/book/myBookings/${email}`, config)
      .then((response) => {
        // console.log(response.data[0].stadium_booked[0].price)
        setBookingData(response.data);
        console.log(bookingData)
      });
  }, []);

  return (
    <>
    <img src={user} className="bookings-img"></img>
    <div className="table bookingsTable">
      <h2>Your Bookings</h2>
      <div className="scrollit">
      <Table>
      <Thead>
        <Tr>
          
          <Th className="heading">Stadium</Th>
          <Th className="heading">Amount Paid</Th>
          <Th className="heading">State</Th>
          <Th className="heading">Booking Date</Th>
        </Tr>
      </Thead>
      <Tbody>
      {bookingData.map((book,key) => (
              <Tr key={key}>
                
                <Td>{book.stadium_booked[0].stadium_name}</Td>
                <Td>{book.stadium_booked[0].price}</Td>
                <Td>{book.stadium_booked[0].state}</Td>
                <Td>{book.stadium_booked[0].BookedAt}</Td>
                 
              </Tr>
            ))}
       
      </Tbody>
    </Table>
    </div>
    </div>
    </>
  )
}

export default AllBookings

