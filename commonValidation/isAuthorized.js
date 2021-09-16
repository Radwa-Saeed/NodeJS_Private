
const jwt = require("jsonwebtoken")
module.exports=()=>{
    return (req,res,next)=>{
        const token = req.headers.authorization.split(' ')[1];
        const decode =jwt.verify(token,'shhhhh');
        req.user = decode;
        next()
    }

}