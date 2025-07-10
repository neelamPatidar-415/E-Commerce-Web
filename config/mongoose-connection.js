const mongoose = require('mongoose');
const config = require("config");
require('dotenv').config(); 

const dbgr = require("debug")("development:mongoose");

mongoose
.connect(process.env.MONGO_URI)
.then(function(){
    dbgr("connected");
})
.catch(function(err){
    dbgr(err);
})

module.exports = mongoose.connection;

// .connect(`${config.get("MONGODB_URI")}/scatch`)