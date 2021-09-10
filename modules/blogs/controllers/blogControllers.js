const Blog = require("../model/blogModel");
const {StatusCodes}=require("http-status-codes");
const moment = require("moment");

const getallblogs = async(req,res)=>{
    try {
        let data = await Blog.find({isDeleted:false}).populate('createdby') //.populate to see the object of the user created the blog
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
/* give the creator user id get blog */
const getblog_user = async(req,res)=>{
    const {createdby}=req.body
    try {
        const user= await Blog.find({createdby , isDeleted:false})
        //console.log(user.name)
        res.json({message:"FOUND SUCCESS",user})        
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({message:"ERROR",error})
    }
}

// const getblog_byuser = async(req,res)=>{
//     const {name}=req.body
//     try {
//         const user= await User.find({name , isDeleted:false})
//         const blog = await Blog.find({createdby:user._id,isDeleted:false})
//         console.log(user)
//         res.json({message:"FOUND SUCCESS",blog})        
//     } catch (error) {
//         res.status(StatusCodes.BAD_REQUEST).json({message:"ERROR",error})
//     }
// }

const getblog_today = async (req,res)=>{
    //let today = new Date();
    //let yesterday = new Date(`${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`);
    //let tommorow = new Date(`${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()+1}`);
    let today = moment().add(0,'days');
    let yesterday = moment().add(-1,'days');
    console.log(today)
    console.log(yesterday)
    try {
        const blogs = await Blog.find({$and:[{createdAt:{$gte:yesterday,$lte:today}},{isDeleted:false}]});
        if (blogs){res.json({message:"ALL BLOGS CREATED TODAY", blogs})}
        else {res.json({message:"ERROR NOT FOUND"})}
        
    } catch (error) {
        res.json({message:'ERORR',...error});
    }
}

const getblog_yesterday = async (req,res)=>{
    let yesterday = moment().add(-1,'days');
    let prevday = moment().add(-2,'days');
    console.log(prevday)
    console.log(yesterday)
    try {
        const blogs = await Blog.find({$and:[{createdAt:{$gte:prevday,$lte:yesterday}},{isDeleted:false}]});
        if (blogs){res.json({message:"ALL BLOGS CREATED TODAY", blogs})}
        else {res.json({message:"ERROR NOT FOUND"})}
        
    } catch (error) {
        res.json({message:'ERORR',...error});
    }
}

module.exports={
    getallblogs,addblog,updateblog,deleteallblogs,return_deletedblogs,getblog_id,
    getblog_titlecontent,getblog_user,getblog_today,getblog_yesterday
}