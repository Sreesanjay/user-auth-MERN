const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const path = require('path')
const connect = require('./config/dbConnect')
const app = express();
require('dotenv').config()

//router import 
const userRoute = require('./router/userRouter')
const adminRoute = require('./router/adminRouter')

//db connection 
connect()
//parse request
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// router setup
app.use('/', userRoute)
app.use('/admin', adminRoute)

app.listen(process.env.PORT,()=>console.log('listening to port '+process.env.PORT))