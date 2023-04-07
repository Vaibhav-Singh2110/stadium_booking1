const mongoose = require('mongoose')
var bodyParser = require('body-parser')
const express = require('express')
const cors=require('cors');
const app = express()
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 5000
// const DB_URL = process.env.MONGO_URL
app.use(express.json())
app.use(cors('*'));

app.get('/cors', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.send({ "msg": "This has CORS enabled 🎈" })
  })
app.use(bodyParser.json())
// app.use(express.static("public"))
app.use(bodyParser.urlencoded({
  extended:true
}))

const DB = process.env.MONGO_URL

mongoose.connect(DB,{
  useNewUrlParser:true,
  useCreateIndex:true,
  useUnifiedTopology:true
  // useFindAndModify:false
}).then(()=>{
  console.log("Connected")
}).catch((err)=>console.log("No connection"))


const path = require('path')

    app.get('/',(req,res)=>{
        app.use(express.static(path.resolve(__dirname,'frontend','build')))
        res.sendFile(path.resolve(__dirname,'frontend','build','index.html'))
    })
app.use('/api/auth',require('./routes/auth'))
app.use('/api/add',require('./routes/add_or_remove_stadium'))
app.use('/api/book',require('./routes/booking'))


app.listen(PORT, () => {
  console.log(`Example app listening on port 5000`)
})
