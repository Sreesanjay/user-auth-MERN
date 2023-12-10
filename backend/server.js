const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const connect = require('./config/dbConnect')

//router import 
const userRoute = require('./router/userRouter')

const app = express();
require('dotenv').config()
//db connection 
connect()
//parse request
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// router setup
app.use('/', userRoute)

app.listen(process.env.PORT,()=>console.log('listening to port '+process.env.PORT))