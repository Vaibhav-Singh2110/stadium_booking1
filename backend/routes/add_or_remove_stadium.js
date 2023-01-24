const { application } = require('express')
const express = require('express')
const { body, validationResult } = require('express-validator');
const { mongo } = require('mongoose');
const url = 'mongodb+srv://vaibhavsingh123:Vaibhav123@cluster0.sl7of6y.mongodb.net/?retryWrites=true&w=majority'
const Stadium = require('../models/stadium')
const Admin = require('../models/Admin')
const fetchuser = require('../middleware/fetchuser')

const router = express.Router()
//add a stadium
router.post('/addStadium',fetchuser,async(req,res)=>{
    const stadium =  new Stadium({
        stadium_name:req.body.stadium_name,
        price:req.body.price,
        state:req.body.state,
        size:req.body.size,
        description:req.body.description,
        availability:req.body.availability
    })
    const admin_stadium =  new Admin({
        email:req.body.email,
        stadium_owned:[{
        stadium_name:req.body.stadium_name,
        price:req.body.price,
        state:req.body.state,
        size:req.body.size,
        description:req.body.description,
        availability:req.body.availability,
        AddedAt:new Date()
        }]
    })
   
    const x = await stadium.save()
    const y = await admin_stadium.save()
    // console.log(x)
    res.json("stadium:"+"added:"+x+y)
    // res.json("Adminstadium:"+"added:"+y)
    // res.json("admin-stadium:"+"added:"+y)
})
//remove stadium
router.delete('/deleteStadium/:id',fetchuser,async(req,res,next)=>{
    const id = req.params.id
    try{
        const result = await Stadium.findByIdAndDelete(id)
        res.json("stadium:"+"deleted")
    }catch(error){
        res.json("stadium:"+"not found")
    }
})

//list all stadiums
router.get('/listStadium',fetchuser,async (req,res)=>{
    try{
        const result = await Stadium.find({})  //an empty array which will contain all the occurrences of a collection
        res.json(result)
    }catch(err){
        res.status(401).send("stadium:"+"not found")
    }
})
//list all stadiums according to which admin is logged in

router.get('/listStadium/:email',fetchuser,async (req,res)=>{
    let email = req.params.email;
    try{
        const result = await Admin.find({email: email})  //an empty array which will contain all the occurrences of a collection
        res.json(result)
    }catch(err){
        res.status(401).send("stadium:"+"not found")
    }
})


router.post('/updateStadium/:stadium_name',fetchuser,async(req,res)=>{
    let stadium_name = req.params.stadium_name;
    // let availability = req.params.availability;
    const filter = { stadium_name: stadium_name };
    const update = { availability: "No" };

    const result = await Stadium.findOneAndUpdate(filter,update,{
        new:true,
        upsert:true
    });

    const result1 = await Admin.findOneAndUpdate(filter,update,{
        new:true,
        upsert:true
    });
    res.json({updated:result1});
        

})
router.get('/getAvailability/:stadium_name',fetchuser,async(req,res)=>{
    let stadium_name = req.params.stadium_name;
    let data = await Stadium.findOne({stadium_name:stadium_name});
    // console.log(data.availability)
    res.json({availability:data.availability});
})
module.exports = router