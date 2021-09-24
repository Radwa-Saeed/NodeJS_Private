const User = require("../model/userModel")
const {StatusCodes}=require("http-status-codes")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');

const getallusers = async(req,res)=>{
    try {
        // let data=await User.find({isDeleted:false})
        let data=await User.find({isDeleted:false}).select("-password") // so as not to get the password field 
        res.json({message:"ALL USERS",data})
    } catch (error) {
        res.json({message:"ERROR",error})
    }
}
// const getallusers = async(req,res)=>{
//     console.log(req.user)
//     if (req.user.role == 'admin'){
//         const users = await User.find({isDeleted:false}).select('-password')
//         res.json({message:"ALL USERS",users})
//     }else {
//         res.status(StatusCodes.UNAUTHORIZED).json({message:"NOT ALLOWED"})
//     }
// }

const adduser = async(req,res)=>{
    let {name,email,password,age,location,role}=req.body
    try {
        //await User.insertMany({name,email,password,age,location})
        //res.json({message:"ADDED SUCCESS"})
        // bcrypt.hash(password,7,async function(err,hashed){
        //     if (err) throw err;
        //     else {
        //         const newuser= new User({name,email,password:hashed,age,location})
        //         const user = await newuser.save()
        //         res.status(StatusCodes.CREATED).json({message:"ADDED SUCCESS",user})}
        //     })
        const newuser= new User({name,email,password,age,location,role})
        const user = await newuser.save()
        res.status(StatusCodes.CREATED).json({message:"ADDED SUCCESS",user})
    } catch (err) {
        res.status(StatusCodes.BAD_REQUEST).json({message:"ERROR",err})
    }
}

const registeration = async(req,res)=>{
    let {name,email,password,age,location,role}=req.body
    try {
        const found = await User.findOne({email,isDeleted:false});
        if (found){
            res.status(StatusCodes.BAD_REQUEST).json({message:"ٌREGISTERATION FAILD... THIS EMAIL IS ALREADY EXIST"})
        }
        else{
            const newuser= new User({name,email,password,age,location,role})
            const user = await newuser.save()
            res.status(StatusCodes.CREATED).json({message:"REGISTERED SUCCESS",user})
        }
    } catch (err) {
        res.status(StatusCodes.BAD_REQUEST).json({message:"ERROR",err})
    }
}

const sign_in =async(req,res)=>{
    const {email,password}=req.body
    try {
        const found = await User.findOne({email,isDeleted:false})
        if (!found){
            res.status(StatusCodes.BAD_REQUEST).json({message:"THIS EMAIL IS INVALID"})
        }
        else{
            const match = await bcrypt.compare(password, found.password);
            if (match){
                const token = jwt.sign({_id:found._id,role:found.role}, process.env.SECRET_KEY);
                res.json({message:"SIGNED IN SUCCESS",token,user:{
                    id: found._id,
                    name: found.name,
                    email:found.email
                }})
            }
            else{
                res.status(StatusCodes.BAD_REQUEST).json({message:"WRONG PASSWORD"})
            }
        }
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({message:"ERROR",error})
    }
}

const deleteuser = async(req,res)=>{
    const {_id}=req.params;
    try {
        await User.findByIdAndUpdate({_id},{isDeleted:true})
        res.json({message:"DELETED SUCCESS"})
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({message:"ERROR",error})
    }
}

const updateuser = async (req,res)=>{
    const {_id}=req.params
    const {name,email,password,age,location}=req.body
    try {
        await User.findByIdAndUpdate({_id},{name,email,password,age,location})
        res.json({message:"UPDATED SUCCESS"})
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({message:"ERROR",error})
    }
}

const getuser_id =async(req,res)=>{
    const {_id}=req.params
    try {
        //const user = await User.findById({_id},{isDeleted:false}) 
        const user = await User.find({_id,isDeleted:false}) 
        res.json({message:"FOUND SUCCESS",user})
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({message:"ERROR",error})
    }
}

const getuser_nameandemail = async (req,res)=>{
    const {getname,getemail}=req.params;
    try {
        const user = await User.find({name:new RegExp(getname.toLowerCase()),email:getemail,isDeleted:false}) 
        res.json({message:"FOUND SUCCESS",user})
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({message:"ERROR",error})
    }
}
const getuserbynameandemail = async (req,res)=>{
    const {name,email}=req.body
    try {
        const user = await User.find({$or:[{name},{email}]},{isDeleted:false}) 
        res.json({message:"FOUND SUCCESS",user})
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({message:"ERROR",error})
    }
}

const getuser_gt30 = async(req,res)=>{
    try {
        const users = await User.find({age:{$gt:30},isDeleted:false})
        res.json({message:"FOUND SUCCESS",users})
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({message:"ERROR",error})
    }
}

const getuser_lt30 = async(req,res)=>{
    try {
        const users = await User.find({age:{$lt:30},isDeleted:false})
        res.json({message:"FOUND SUCCESS",users})
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({message:"ERROR",error})
    }
}

const getuser_lte30 = async(req,res)=>{
    try {
        const users = await User.find({age:{$lte:30},isDeleted:false})
        res.json({message:"FOUND SUCCESS",users})
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({message:"ERROR",error})
    }
}

module.exports={
    getallusers,adduser,registeration,sign_in,deleteuser,updateuser,getuser_id,getuser_nameandemail,
    getuserbynameandemail,getuser_gt30,getuser_lt30,getuser_lte30
}