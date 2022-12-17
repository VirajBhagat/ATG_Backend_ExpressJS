const express = require('express');
const app = express();
const router=express.Router();
const ATG_DB= require('../models/ATG_DB');
const cors=require('cors');
const bodyParser = require('body-parser')

app.use(cors());
app.use(bodyParser.urlencoded({ extended:true }));
app.use("/images", express.static('images'));


// Registration
router.post('/register', async (req,res) => {
    const user=new ATG_DB({
        Username: req.body.Username,
        Email: req.body.Email,
        Password: req.body.Password
    })
    try{
        const newUser=await user.save();
        res.status(201).json(newUser);
    }catch(err){
        res.status(400).json({message: err.message});
    }
})

// Login
router.get('/login', getUser, (req,res) => {
    if((req.body.Username === res.user[0].Username) && (req.body.Password === res.user[0].Password)){
        res.send("Login successful") 
    }else{
        res.send("Invalid username or password")
    }
});

// Forgot Password
router.patch('/fg_pass', setForgotPass, async (req,res) => {

    if(req.body.Username != null){
        res.user.Password=req.body.Password
    }
    try{
        const updatedUser = await res.user.save();
        res.json("Updated User: " + updatedUser)
    }catch(err){
        res.status(400).json({message: err.message});
    }
})

// Get Specific User
async function getUser(req, res, next){
    let user

    try{
        user=await ATG_DB.find({Username: req.body.Username});
        if(user === null){
            return res.status(404).json({message: 'User not found'});
        }
    }
    catch(err){
        return res.status("Invalid Username & Password");
    }
    res.user=user
    next()
}

// User Forgot Password
async function setForgotPass(req, res, next){
    let user
    try{
        user=await ATG_DB.find({Username: req.body.Username});
        if(user === null){
            return res.status("Invalid Username & Password");
        }
    }
    catch(err){
        return res.status("Invalid Username & Password");
    }
    res.user=user[0]
    next()
}

module.exports=router