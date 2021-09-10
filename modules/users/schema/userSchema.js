const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const userSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    age:{type:Number,required:true},
    location:{type:String,required:true},
    role:{type:Number},
    verified:{type:Boolean,default:false},
    isDeleted:{type:Boolean,default:false}
},
{
    timestamps:true
})
/* pre & post hook https://mongoosejs.com/docs/middleware.html#aggregate 
 this.password means the pasword comming in the instance of the new User so the fun cann't be arrow cus this will refer to the prev scop as we don't haf var called*/
userSchema.pre('save',async function(next) {
    this.password= await bcrypt.hash(this.password,7) // bcrypt https://www.npmjs.com/package/bcrypt
    next();
  });

module.exports=userSchema