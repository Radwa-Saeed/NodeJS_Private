const User = require("../model/userModel")
const {StatusCodes}=require("http-status-codes")

const getallusers = async(req,res)=>{
    try {
        let data=await User.find({isDeleted:false})
        res.json({message:"ALL USERS",data})
    } catch (error) {
        res.json({message:"ERROR",error})
    }
    
}
const adduser = async(req,res)=>{
    let {name,email,password,age,location}=req.body
    try {
        //await User.insertMany({name,email,password,age,location})
        //res.json({message:"ADDED SUCCESS"})
        const newuser= new User({name,email,password,age,location})
        const user = await newuser.save()
        res.status(StatusCodes.CREATED).json({message:"ADDED SUCCESS",user})
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
    getallusers,adduser,deleteuser,updateuser,getuser_id,getuser_nameandemail,
    getuserbynameandemail,getuser_gt30,getuser_lt30,getuser_lte30
}