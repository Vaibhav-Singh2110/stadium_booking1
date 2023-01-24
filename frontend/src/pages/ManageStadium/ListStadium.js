import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import "./ListStadium.css";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { useSelector } from 'react-redux';
import admin from './admin.jpg'
const ListStadium = () => {
  const [stadiumData, setStadiumData] = useState([]);
  const[availability,setAvailability] = useState("");
  const config = {
    //sending auth-toke to frontend also
    headers: {
      "auth-token": localStorage.getItem("token"),
    },
  };
  const email= useSelector((store)=>store.users.email)
  useEffect(() => {
    
    axios
      .get(`http://localhost:5000/api/add/listStadium/${email}`, config)
      .then((response) => {
        console.log(response.data[1].stadium_owned[0].stadium_name)
        setStadiumData(response.data);
      });
  }, []);

  // const handleClick=async(e)=>{
    
    
  // }

  // const handleChange=()=>{
    
  //   // console.log(x);
  // }

  return (
    <>
    <img src={admin} className="listStadium-img"></img>
    
      <div className="table listStadiumTable">
      <h2>Your Stadiums</h2>
        <div className="scrollit">
        <Table>
          <Thead>
            <Tr>
              <Th className="heading">Added At</Th>
              <Th className="heading">Name</Th>
              <Th className="heading">Price</Th>
              <Th className="heading">State</Th>
              <Th className="heading">Size</Th>
              <Th className="heading">Description</Th>
              <Th className="heading">Availability</Th>
            </Tr>
          </Thead>
          <Tbody>
            {stadiumData.map((stadi) => (
              <Tr>
                <Td>{stadi.stadium_owned[0].AddedAt}</Td>
                <Td>{stadi.stadium_owned[0].stadium_name}</Td>
                <Td>{stadi.stadium_owned[0].price}</Td>
                <Td>{stadi.stadium_owned[0].state}</Td>
                <Td>{stadi.stadium_owned[0].size}</Td>
                <Td>{stadi.stadium_owned[0].description}</Td>
                <Td>
                  {stadi.stadium_owned[0].availability}<br></br>
                  {stadi.stadium_owned[0].availability === "Yes" ?<button type="submit" className="btn btn-danger mr-5">
                      Make unavailable
                    </button>
                   : 
                    <button type="submit" className="btn btn-success">
                      Make available
                    </button>
                  }
                </Td>
              </Tr>
            ))}
          </Tbody>
          
        </Table>
        </div>
      </div>
    </>
  );
};

export default ListStadium;
