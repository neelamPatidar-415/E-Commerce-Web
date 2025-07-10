const express = require('express');
const router = express.Router();
const isLoggedIn = require("../Middleware/isLoggedIn");
const productModel = require('../models/product-model');
const userModel = require('../models/user-model');

router.get("/",function(req,res){
    let error = req.flash("error");   //// flash msg error name se bheja tha isLogged in page me vaha se redirect hoke yaha aaya he 
    let success = req.flash("success");   //// flash msg error name se bheja tha isLogged in page me vaha se redirect hoke yaha aaya he 
    res.render("index", {error,success, loggedin:false});
})

router.get("/shop", isLoggedIn,async function(req,res){
    const products = await productModel.find();
    let success = req.flash("success");
    res.render('shop',{products, success});
})

router.get("/cart", isLoggedIn,async function(req,res){
    let user = await userModel
    .findOne({email: req.user.email})
    .populate('cart');

    let products = user.cart;

    res.render('cart', {products});
})
router.get("/addtocart/:product_id", isLoggedIn,async function(req,res){
    let user = await userModel.findOne({email : req.user.email});
    user.cart.push(req.params.product_id);
    await user.save();

    req.flash("success", "Added To Cart");
    res.redirect('/index/shop');
})


module.exports = router;