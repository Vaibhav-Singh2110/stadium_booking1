const mongoose = require('mongoose')
var bodyParser = require('body-parser')
const express = require('express')
const cors=require('cors');
const app = express()
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

const DB = 'mongodb+srv://vaibhavsingh123:Vaibhav123@cluster0.sl7of6y.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(DB,{
  useNewUrlParser:true,
  useCreateIndex:true,
  useUnifiedTopology:true
  // useFindAndModify:false
}).then(()=>{
  console.log("Connected")
}).catch((err)=>console.log("No connection"))



app.use('/api/auth',require('./routes/auth'))
app.use('/api/add',require('./routes/add_or_remove_stadium'))
app.use('/api/book',require('./routes/booking'))


app.listen(5000, () => {
  console.log(`Example app listening on port 5000`)
})
