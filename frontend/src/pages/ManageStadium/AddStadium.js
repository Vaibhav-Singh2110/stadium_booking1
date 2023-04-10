import React from "react";
import axios from "axios";
import { useState } from "react";
import admin from './admin.jpg'
import './addStadium.css'
const AddStadium = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [state, setState] = useState("");
  const [size, setSize] = useState("");
  const [description, setDescription] = useState("");
  const[availability,setAvailability] = useState("");
  
  const config = {
    headers:{
      "auth-token": localStorage.getItem("token"),
      
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    checkEqual();

    try {
      const a = {
        email:email,
        stadium_name: name,
        price: price,
        state: state,
        size: size,
        description: description,
        availability:availability
      };

      console.log(a);

      const res = await axios.post(
        "https://stadium-booking1-9neb.vercel.app/api/add/addStadium",a,config);
        console.log(config)
      console.log("res", res);
    } catch (err) {
      console.log(err);
      alert("stadium already exists");
    }
    window.location="/admin"
  };

  const checkEqual = () => {
    if (
      email === ""||
      name === "" ||
      price === "" ||
      state === "" ||
      size === "" ||
      description === ""||
      availability === ""
    ) {
      alert("Please fill all the fields");
    }
  };
  return (
    <>
    
      <img src={admin} className="addStadium-img"></img>
      
      <form onSubmit={handleSubmit} className="addStadiumForm">
      <h2>ADD STADIUM</h2>
      <div className="scroll">
      <div className="form-group inputBox">
          <label>Your email</label>
          <input
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            value={email}
            className="form-control"
            id="email"
          />
        </div>
        <div className="form-group inputBox">
          <label>Name</label>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            name="name"
            value={name}
            className="form-control"
            id="stadium_name"
            placeholder="ABCD"
            pattern="[A-Za-z]+" title="Only alphabet characters are allowed."
          />
        </div>
        <div className="form-group inputBox">
          <label>Price</label>
          <input
            type="text"
            onChange={(e) => setPrice(e.target.value)}
            name="price"
            value={price}
            className="form-control"
            id="price"
            placeholder="XXXX"
            pattern="[0-9]+" title="Only numbers are allowed."
          />
        </div>
        <div className="form-group inputBox">
          <label>State</label>
          <input
            type="text"
            onChange={(e) => setState(e.target.value)}
            name="state"
            value={state}
            className="form-control"
            id="state"
            placeholder=""
            pattern="[A-Za-z]+" title="Only alphabet characters are allowed."
          />
        </div>
        <div className="form-group inputBox">
          <label>Size</label>
          <input
            type="text"
            onChange={(e) => setSize(e.target.value)}
            name="size"
            value={size}
            className="form-control"
            id="size"
            placeholder=""
            pattern="[0-9]+" title="Only numbers are allowed."
          />
        </div>

        <div className="form-group inputBox">
          <label>Description</label>
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            name="description"
            value={description}
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="5"
          ></textarea>
        </div>

        <div className="form-group inputBox">
        <label>Availability</label>
          <input
            type="text"
            onChange={(e) => setAvailability(e.target.value)}
            name="availability"
            value={availability}
            className="form-control"
            id="size"
            placeholder="Yes/No"
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          onSubmit={handleSubmit}
        >
          Update
        </button>
        </div>
      </form>
      
    </>
  );
};
export default AddStadium;
