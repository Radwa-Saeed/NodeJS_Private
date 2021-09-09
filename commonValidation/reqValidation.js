const{StatusCodes,getReasonPhrase}=require("http-status-codes")
module.exports=(schema)=>{
    return(req,res,next)=>{
        const validationErrors =[]
        const validationResult=schema.body.validate(req.body)
        if (validationResult.error){
            validationErrors.push(validationResult.error.details[0].message)
        }
        if (validationErrors.length){
            //res.json({message:"VALIDATION ERROR",error:validationErrors.join()})
            res.status(StatusCodes.BAD_REQUEST).json({message:`VALIDATION ERROR: ${validationErrors.join()}`,error:getReasonPhrase(StatusCodes.BAD_REQUEST)})
            return;
        }
        else{
            //res.json({message:"VALIDATION SUCCESS"})
            next();
        }
    };
    
}