const mongoose = require("mongoose");
const connection = ()=>{
    return mongoose
    .connect(process.env.CONNECTION_STRING ,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then((result)=>console.log("DB CONNECTED SUCCESSFULLY"))
    .catch((err)=>console.log(err))
};
module.exports=connection;