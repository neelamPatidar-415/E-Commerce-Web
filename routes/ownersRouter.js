const express = require('express');
const router = express.Router();

const ownermodel = require("../models/owner-model");

if(process.env.NODE_ENV === "development"){
    router.post("/create", async function(req,res){
        const owner = await ownermodel.find();
        // res.send(owner.length);
        if(owner.length){
            return res.status(503).send("you can't create an owner");
        }
        else{
            let {fullname , email, password} = req.body;

            const createdOwner = ownermodel.create({
              fullname,
              email,
              password,
            });

            res.status(200).send(createdOwner);
        }
    })
}

router.get("/admin", function(req,res){
    let success = req.flash("success");
    res.render("createProducts", {success});
});

// console.log(process.env.DEBUG);   /// its giving undefined means env set nhi he but giving value development means set he cuz humne set kiya tha 


// if(process.env.NODE_ENV === "production"){
//     router.post("/create", function(req,res){
//         console.log("hey here after production , right?");
//         res.send("hey here after production , right?");
//     })
// }

module.exports = router;