const mongoose = require("mongoose")
const blogSchema = require("../schema/blogSchema")
const Blog = mongoose.model("Blog",blogSchema)
module.exports=Blog