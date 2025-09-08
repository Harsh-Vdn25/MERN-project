const {UserModel}=require('../models/Note');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const JWT_SECRET=process.env.JWT_SECRET;

async function SignUp(req,res){
    const {email,password,firstName,lastName}=req.body;
    try{
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);
        const response=await UserModel.create({
            email:email,
            password:hashedPassword,
            firstName:firstName,
            lastName:lastName
        })
        const token=jwt.sign({
            id:response._id.toString()
        },JWT_SECRET);
        
        res.status(200).json({
            message:"Signed up successfully",
            Token:token
        })
    }catch(err){
        console.log(err);
        res.status(400).json({
            Error:err
        })
    }
}

async function Signin(req,res){
    const {email,password}=req.body;
    try{
        const User=await UserModel.findOne({email});
        if(!User){
            return res.status(400).json({message:"Please Singnup"})
        }
        const isTrue=await bcrypt.compare(password,User.password);
        if(!isTrue){
            return res.status(400).json({
                message:"Wrong password"
            })
        }
        const token=jwt.sign({
            id:User._id.toString()
        },JWT_SECRET);

        res.status(200).json({
            message:"Signed in successfully",
            Token:token
        })
    }catch(err){
        console.log(err.message);
    }
}

module.exports={
    SignUp,
    Signin
}