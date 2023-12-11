const mongoose = require('mongoose');

const  connect =  ()=>{
   mongoose.connect(process.env.MONGODB_URL)
   .then(()=>console.log('Connected to mongodb'))
   .catch(()=>console.log('error while connecting db'))
}

module.exports =  connect