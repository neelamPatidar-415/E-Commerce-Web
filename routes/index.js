const express = require('express');
const router = express.Router();
const isLoggedIn = require("../Middleware/isLoggedIn");
const productModel = require('../models/product-model');

router.get("/",function(req,res){
    let error = req.flash("error");   //// flash msg error name se bheja tha isLogged in page me vaha se redirect hoke yaha aaya he 
    res.render("index", {error});
})

router.get("/shop", isLoggedIn,async function(req,res){
    const products = await productModel.find();
    res.render('shop',{products});
})


module.exports = router;