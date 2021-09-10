const mongoose = require("mongoose")
const blogSchema = new mongoose.Schema({
    title :{type:String,required:true},
    content :{type:String,required:true},
    createdby :{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true}, //to link between the two collections
    isDeleted :{type:Boolean,default:false},
},
{
    timestamps:true
})

module.exports=blogSchema