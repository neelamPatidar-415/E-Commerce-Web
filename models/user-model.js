const mongoose = require("mongoose");

// mongoose.connect("mongodb://127.0.0.1:27017/E-commerce");   //no need b/c config folder

const userSchema = mongoose.Schema({
    fullname: String,
    email: String,
    // isAdmin: Boolean,
    password: String,
    cart: {
        type: Array,
        default:[]
    },
    orders: {
        type: Array,
        default: []
    },
    picture: String,
    contact: Number,
})

module.exports = mongoose.model("user", userSchema);