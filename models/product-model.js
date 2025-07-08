const mongoose = require("mongoose");

// mongoose.connect("mongodb://127.0.0.1:27017/E-commerce");  //no need b/c config folder

const productSchema = mongoose.Schema({
    name: String,
    price: Number,
    bgcolor: String,
    image:Buffer,
    discount: {
        type:Number,
        default: 0,
    },
    textcolor: String,
    panelcolor: String,
})

module.exports = mongoose.model("product", productSchema);