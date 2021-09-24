const Joi=require("joi")
module.exports={ 
    adduserSchemaValidation:{
        body:Joi.object().required().keys({
                name:Joi.string().required(),
                email:Joi.string().required().email(),
                password:Joi.string().required(),
                age:Joi.number().required().min(20).max(60).messages({"number.min":"SORRY...MIN AGE IS 20","number.max":"SORRY...MAX AGE IS 60"}),
                location:Joi.string().required(),
                role:Joi.string()
            })
        },
    signinSchemaValidation:{
        body:Joi.object().required().keys({
            email:Joi.string().required().email(),
            password:Joi.string().required()
        })
    },    
    updateuserSchemaValidation:{
        params:Joi.object().required().keys({
            id:Joi.string().required()
        }),
        body:Joi.object().required().keys({
            name:Joi.string().required().messages({"string.empty":"SORRY...PLEASE ENTER THE NAME TO BE UPDATED"}),
            email:Joi.string().email(),
            password:Joi.string(),
            age:Joi.number().min(20).max(60).messages({"number.min":"SORRY...MIN AGE IS 20","number.max":"SORRY...MAX AGE IS 60"}),
            location:Joi.string(),
            rule:Joi.number()
        })
    }
}

