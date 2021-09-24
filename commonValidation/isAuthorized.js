const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const rbac = require("../rbac/rbac");
module.exports=(endPoint)=>{
    return async(req,res,next)=>{
        if (req.headers.authorization){
            const token = req.headers.authorization.split(' ')[1];
            if(token){
                try {
                    const decode =jwt.verify(token,process.env.SECRET_KEY); // to decode the token (encrypted data)
                    req.user = decode;
                    const isAllowed = await rbac.can(req.user.role,endPoint)
                    if(isAllowed){
                        next();
                    }
                    else{
                        res.status(StatusCodes.FORBIDDEN).json({message:`UNAUTHORIZED... ${req.user.role} NOT ALLOWED TO DO THAT`})
                    }
                } catch (error) {
                    res.status(StatusCodes.BAD_REQUEST).json({message:"ERROR",error})
                }
            }
            else{
                res.status(StatusCodes.UNAUTHORIZED).json({message:"TOKEN CAN NOT BE EMPTY "})
            }
        }
        else{
            res.status(StatusCodes.UNAUTHORIZED).json({message:"TOKEN REQUIRED"})
        }

    }

}