const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {generateToken} = require("../utils/generateToken");

module.exports.registerUser = async function(req,res){
    try {
      let { fullname, email, password } = req.body;

      //if user already have acc with this email then don't create again
      const user = await userModel.findOne({email});
      if(user) return res.status(203).send("You already have account. Please Login");

      //creating hash then replace password at database 
      bcrypt.genSalt(10,function(err,salt){
        bcrypt.hash(password, salt, async function(err, hash){
            if (err) res.send(err.message);
            else {
              const user = await userModel.create({
                fullname,
                email,
                password: hash,
              });

              //generate token by jwt then set token as cookie
              //hey but here is the modular code for jwt things, actually secret ko secure karna jaruri he 
              //secret save in .env file then require dotenv at app.js to load .env to process.env 
              // now use this secret anywhere but 
              //create generateToken.js at utils and crete token their export and require here and use as a function lana usse
              let token = generateToken(user);
              res.cookie("token", token);
              res.send("User created successfull");
            }
        })
      })
    } catch (err) {
      res.send(err.message);
    }
};

module.exports.loginUser = async function(req,res){
    //login karao

    let { email, password} = req.body;

    let user = await userModel.findOne({email});
    if(!user) {
      req.flash("error","email or password incorrect");
      return res.redirect("/index/");
    }

    bcrypt.compare(password, user.password, async function(err, result){
        if (result) {
          //set token
          let token = generateToken(user);
          res.cookie("token", token);
          // res.send("You can Login");
          const products = await productModel.find();
          res.render('shop',{products});
        } else {
          // res.status(504).send("email or password incorrect");
          req.flash("error", "email or password incorrect");
          return res.redirect("/index/");
        }
    })
};


module.exports.logoutUser = async function(req,res){
    //logout karao

    if(!req.cookies.token){
      res.cookie("token", "");
    }
    
    // return res.redirect("/");
    res.send("Logged out");


};