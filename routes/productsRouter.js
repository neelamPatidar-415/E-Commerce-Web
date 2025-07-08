const express = require('express');
const router = express.Router();
const upload = require("../config/multer");
const productModel = require("../models/product-model");

router.post("/create", upload.single("image"), async function(req,res){

    try{
        let {name, price, discount, bgcolor, textcolor, panelcolor} = req.body;

        const product = await productModel.create({
            image: req.file.buffer,
            name, 
            price, 
            discount, 
            bgcolor, 
            textcolor, 
            panelcolor,
        });

        req.flash("success", "Product created successfully.");
        res.redirect("/owners/admin");
    }catch(err){
        res.send(err.message);
    }
})

// router.get("/shop")

module.exports = router;