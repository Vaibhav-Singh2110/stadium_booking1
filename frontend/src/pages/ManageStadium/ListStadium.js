import React, { useEffect,useRef } from "react";
import axios from "axios";
import { useState } from "react";
import "./ListStadium.css";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { useSelector } from "react-redux";
import admin from "./admin.jpg";
import { Camera, Delete, Edit, Trash, Trash2 } from "react-feather";

const ListStadium = () => {
  const [stadiumData, setStadiumData] = useState([]);
  const [availability, setAvailability] = useState("");

  const [email1, setEmail1] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [state, setState] = useState("");
  const [size, setSize] = useState("");
  const [description, setDescription] = useState("");
  const[availability1,setAvailability1] = useState("");
  const config = {
    //sending auth-toke to frontend also
    headers: {
      "auth-token": localStorage.getItem("token"),
    },
  };
  const email = useSelector((store) => store.users.email);
  useEffect(() => {
    axios
      .get(`/api/add/listStadium/${email}`, config)
      .then((response) => {
        // console.log(response.data[1].stadium_owned[0].stadium_name);
        setStadiumData(response.data);
      });
  }, []);

  const ref = useRef(null);
  const updateNote = async (e) => {
      e.preventDefault();
      ref.current.click()
  };

  const handleSubmit = async(e)=>{
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
        availability:availability1
      };

      console.log(a);

      const res = await axios.post(
        `/api/add/updateStadium/${name}`,a,config);
        console.log(config)
      console.log("res", res);
    } catch (err) {
      console.log(err);
      alert("stadium already exists");
    }
    // window.location="/admin"
    
  }

  const checkEqual = () => {
   
      alert("Updated successfully!");
    
  };

  const DeleteNote = async (e) => {
    // const delete_name = stadiumData[].stadium_owned[1].stadium_name
    const a = prompt("Enter the name of stadium to confirm deletion");
    // console.log(stadiumData)
    e.preventDefault();
    // alert("Are u sure u want to delete this stadium?");
    try {
      console.log("name"+name);
      const res = await axios.delete(
        `/api/add/deleteStadium/${a}`,config);
        
        console.log(config)
      console.log("res", res);
    } catch (err) {
      console.log(err);
      alert("stadium not found");
    }

    alert("Deleted successfully")
};
  return (
    <>

    {/* programmaticaly making this button work for modal */}
    <button
        type="button"
        className="btn btn-primary d-none"
        data-toggle="modal"
        data-target="#exampleModal"
        ref = {ref}
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog " role="document">
          <div className="modal-content modal_css">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Data
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body ">
            <form onSubmit={handleSubmit}>
            <div className="scroll">
      <div className="form-group inputBox">
          <label>Your email</label>
          <input
            type="text"
            onChange={(e) => setEmail1(e.target.value)}
            name="email1"
            value={email1}
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
            onChange={(e) => setAvailability1(e.target.value)}
            name="availability1"
            value={availability1}
            className="form-control"
            id="size"
            placeholder="Yes/No"
          />
        </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button type="submit" className="btn btn-success" onSubmit={handleSubmit}>
                Save changes
              </button>
            </div>
            </form>
          </div>
        </div>
      </div>
      </div>
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
                <Th className="heading">Modify</Th>
              </Tr>
            </Thead>
            <Tbody>
              {stadiumData.stadium_owned.map((stadi) => (
                <Tr>
                  <Td>{stadi.AddedAt}</Td>
                  <Td>{stadi.stadium_name}</Td>
                  <Td>{stadi.price}</Td>
                  <Td>{stadi.state}</Td>
                  <Td>{stadi.size}</Td>
                  <Td>{stadi.description}</Td>

                  <Td>
                    {stadi.stadium_owned[0].availability}
                    <br></br>
                    {stadi.stadium_owned[0].availability === "Yes" ? (
                      <button type="submit" className="btn btn-danger mr-5">
                        Make unavailable
                      </button>
                    ) : (
                      <button type="submit" className="btn btn-success">
                        Make available
                      </button>
                    )}
                  </Td>
                  <Td>
                    <Edit width="25" height="25" onClick={updateNote} />
                    <Trash2 width="25" height="25" color="red" onClick={DeleteNote}></Trash2>
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
