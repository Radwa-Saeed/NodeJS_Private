const Blog = require("../model/blogModel");

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

module.exports={
    getallblogs,addblog
}