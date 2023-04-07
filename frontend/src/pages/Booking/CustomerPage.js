import React from "react";
import { useSelector } from "react-redux";
import user from "./user.jpg";
import "./CustomerPage.css";

const CustomerPage = () => {
  const name = useSelector((store) => store.users.name);
  const routeChange = () => {
    window.location = "/book";
  };
  const routeChange1 = () => {
    window.location = "/bookings";
  };
  return (
    <div>
      <img src={user} className="customerPage-img"></img>
      
      <div className="customer_wel">
      <h2><span>WELCOME BACK! {name}</span></h2>
        <button
          className="btn btn-success my-2 btn-lg md-10"
          onClick={routeChange}
        >
          Book Stadium
        </button>
        <button className="btn btn-primary my-2 btn-lg" onClick={routeChange1}>
          My Bookings
        </button>
      </div>
    </div>
  );
};

export default CustomerPage;
