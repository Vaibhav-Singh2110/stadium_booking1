const mongoose = require('mongoose');
const { Schema } = mongoose;
const CustomerSchema= new Schema({
    
    email:{
        type:String,
        required:true
    },
    stadium_booked : [{
        stadium_name:{
            type:String,
            required:true
        },
        price:{
            type:String,
            required:true
        },
        state:{
            type:String,
            required:true
        },
        BookedAt:{
            type: String,
            required:true
        }
    }]
    

  });

  module.exports = mongoose.model('Customer',CustomerSchema);