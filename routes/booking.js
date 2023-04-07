const { application } = require('express')
const express = require('express')
const { body, validationResult } = require('express-validator');
const { mongo } = require('mongoose');
const url = 'mongodb+srv://vaibhavsingh123:Vaibhav123@cluster0.sl7of6y.mongodb.net/?retryWrites=true&w=majority'
const Stadium = require('../models/stadium')
const Customer = require('../models/Customer')
const router = express.Router()
const fetchuser = require('../middleware/fetchuser');

//Search stadiums based 
router.get('/search/:key',fetchuser,async(req,res,next)=>{
    console.log("Recieved key",req.params.key)
    try{
        const result = await Stadium.find(
            {
            "$or":[
                {stadium_name:req.params.key},
                {state:req.params.key}
            ]
        }
        )
        res.json(result)
    }catch(err){
        res.status(401).send("stadium:"+"not found")
    }
})

router.post('/CustomerBookings',fetchuser,async(req,res)=>{
    let date=new Date();
    const options={timeZone:"Asia/Kolkata",
    hour:"2-digit",
    minute:"2-digit",
    second:"2-digit",
    
};
    const IndianDate=date.toLocaleDateString("en-IN",options);
    const BookedAt=IndianDate.split(",").join(" ");
    console.log(BookedAt)
    const customer_booking=  new Customer({
        email:req.body.email,
        stadium_booked:[{
        stadium_name:req.body.stadium_name,
        price:req.body.price,
        state:req.body.state,
        BookedAt:BookedAt
        }]
    })
   console.log("Booking recieved",req.body)
   console.log("Booking recieved customer ",customer_booking)
    const x = await customer_booking.save()
    const filter = { stadium_name: req.body.stadium_name };
    const update = { availability: "No" };
// now make this stadium availbility as NO
const stadium= await Stadium.findOneAndUpdate(filter,update,{
    new:true,
    upsert:true
})
})

//Update the booking based on which user is logged in
router.get('/myBookings/:email',fetchuser,async (req,res)=>{
    let email = req.params.email;
    try{
        const result = await Customer.find({email: email})  //an empty array which will contain all the occurrences of a collection
        res.json(result)
    }catch(err){
        res.status(401).send("No bookings found")
    }
})

module.exports = router;