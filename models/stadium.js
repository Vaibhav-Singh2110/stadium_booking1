const mongoose = require('mongoose');
const { Schema } = mongoose;
const StadiumSchema = new Schema({
    
    stadium_name:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true,
    },
    state:{
        type:String,
        required:true
    },

    size:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    availability:{
        type:String,
        required:true
    }
  });

  module.exports = mongoose.model('Stadium',StadiumSchema);