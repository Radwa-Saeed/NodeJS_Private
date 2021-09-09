const Blog = require("../model/blogModel");
const {StatusCodes}=require("http-status-codes");
const User = require("../../users/model/userModel");

const getallblogs = async(req,res)=>{
    try {
        let data = await Blog.find({isDeleted:false})
        res.json({message:'ALL BLOGS',data})
    } catch (error) {
        res.json({message:"ERROR",error})
    }
}

const addblog = async (req,res)=>{
    let {title,content,createdby}=req.body
    try {
        await Blog.insertMany({title,content,createdby})
        res.json({message:"ADDED SUCCESS"})
    } catch (error) {
        res.json({message:"ERROR",error})
    }
}

const updateblog = async(req,res)=>{
    const {_id}=req.params;
    const {title,content,createdby}=req.body;
    try {
        await Blog.findByIdAndUpdate({_id},{title,content,createdby})
        res.json({message:"UPDATED SUCCESS"})
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({message:"ERROR",error})
    }
}

const deleteallblogs = async(req,res)=>{
    try {
        await Blog.updateMany({isDeleted:true})
        res.json({message:"ALL BLOGS DELETED SUCCESS"})
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({message:"ERROR",error})
    }
}

const return_deletedblogs = async(req,res)=>{
    try {
        const deleted = await Blog.find({isDeleted:true})
        res.json({message:"ALL DELETED BLOGS",deleted})
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({message:"ERROR",error})
    }
}

const getblog_id = async(req,res)=>{
    const {_id}=req.params
    try {
        const blog = await Blog.findById({_id},{isDeleted:false})
        res.json({message:"FOUND SUCCESS",blog}) 
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({message:"ERROR",error})
    }
}

const getblog_titlecontent =async(req,res)=>{
    const {title,content}=req.params
    try {
        const blog = await Blog.find({title,content,isDeleted:false})
        res.json({message:"FOUND SUCCESS",blog}) 
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({message:"ERROR",error})
    }
}

const getblog_user = async(req,res)=>{
    const {name}=req.body
    try {
        const user= await User.find({name , isDeleted:false})
        console.log(user.name)
        res.json({message:"GET SUCCESS"})        
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({message:"ERROR",error})
    }
}
module.exports={
    getallblogs,addblog,updateblog,deleteallblogs,return_deletedblogs,getblog_id,
    getblog_titlecontent,getblog_user
}