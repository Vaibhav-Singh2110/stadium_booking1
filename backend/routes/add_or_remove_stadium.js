const { application } = require("express");
const express = require("express");
const { body, validationResult } = require("express-validator");
const { mongo } = require("mongoose");
const url =
  "mongodb+srv://vaibhavsingh123:Vaibhav123@cluster0.sl7of6y.mongodb.net/?retryWrites=true&w=majority";
const Stadium = require("../models/stadium");
const Admin = require("../models/Admin");
const fetchuser = require("../middleware/fetchuser");

const router = express.Router();
//add a stadium
router.post("/addStadium", fetchuser, async (req, res) => {
  const stadium = new Stadium({
    stadium_name: req.body.stadium_name,
    price: req.body.price,
    state: req.body.state,
    size: req.body.size,
    description: req.body.description,
    availability: req.body.availability,
  });


  //for converting date and time
  let date = new Date();
  const options = {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  const IndianDate = date.toLocaleDateString("en-IN", options);
  const BookedAt = IndianDate.split(",").join(" ");
  console.log(BookedAt);


  const admin_stadium = new Admin({
    email: req.body.email,
    stadium_owned: [
      {
        stadium_name: req.body.stadium_name,
        price: req.body.price,
        state: req.body.state,
        size: req.body.size,
        description: req.body.description,
        availability: req.body.availability,
        AddedAt: BookedAt,
      },
    ],
  });

  const x = await stadium.save();
  const y = await admin_stadium.save();
  // console.log(x)
  res.json("stadium:" + "added:" + x + y);
  // res.json("Adminstadium:"+"added:"+y)
  // res.json("admin-stadium:"+"added:"+y)
});



//remove stadium
router.delete("/deleteStadium/:stadium_name", fetchuser, async (req, res) => {
  const stadium_name = req.params.stadium_name;
  try {
    const result = await Stadium.deleteOne({stadium_name:stadium_name});
    const result1 = await Admin.remove({"stadium_owned.stadium_name":stadium_name})
    res.json({deleted:result,result1});
  } catch (error) {
    res.json("stadium:" + "not found");
  }
});

//list all stadiums
router.get("/listStadium", fetchuser, async (req, res) => {
  try {
    const result = await Stadium.find({}); //an empty array which will contain all the occurrences of a collection
    res.json(result);
  } catch (err) {
    res.status(401).send("stadium:" + "not found");
  }
});
//list all stadiums according to which admin is logged in

router.get("/listStadium/:email", fetchuser, async (req, res) => {
  let email = req.params.email;
  try {
    const result = await Admin.find({ email: email }); //an empty array which will contain all the occurrences of a collection
    res.json(result);

  } catch (err) {
    res.status(401).send("stadium:" + "not found");
  }
});


//update stadium both user specific as well as general update
router.post("/updateStadium/:stadium_name", fetchuser, async (req, res) => {
  let stadium_name = req.params.stadium_name;
  const a={
    email:req.body.email,
    stadium_name:req.body.stadium_name,
    price: req.body.price,
    state: req.body.state,
    size: req.body.size,
    description: req.body.description,
    availability: req.body.availability,
  }
  const filter = { stadium_name: stadium_name };

  const update = { stadium_name: a.stadium_name,price:a.price,state:a.state,size:a.size,description:a.description};
  const filter1 = {"stadium_owned.stadium_name":stadium_name};
  console.log(filter1)
  let date = new Date();
  const options = {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  const IndianDate = date.toLocaleDateString("en-IN", options);
  const BookedAt = IndianDate.split(",").join(" ");
  console.log(BookedAt);
  const update1 = { stadium_owned: [
    {
      stadium_name: a.stadium_name,
      price: a.price,
      state: a.state,
      size: a.size,
      description: a.description,
      availability:a.availability,
      AddedAt: BookedAt,
    },
  ],};
  const result = await Stadium.findOneAndUpdate(filter, update, {   //done(working)
    new: true,
    // upsert: true,
  });

  const result1 = await Admin.findOneAndUpdate(filter1, update1, {  
    new: true,
    // upsert: true,
  });
  res.json({updated:result,result1});
});
router.get("/getAvailability/:stadium_name", fetchuser, async (req, res) => {
  let stadium_name = req.params.stadium_name;
  let data = await Stadium.findOne({ stadium_name: stadium_name });
  // console.log(data.availability)
  res.json({ availability: data.availability });
});
module.exports = router;
