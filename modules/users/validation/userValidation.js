const Joi=require("joi")
module.exports={ adduserSchemaValidation:{
    body:Joi
    .object()
    .required()
    .keys({
            name:Joi.string().required(),
            email:Joi.string().required().email(),
            password:Joi.string().required(),
            age:Joi.number().required().min(20).max(60).messages({"number.min":"SORRY...MIN AGE IS 20","number.max":"SORRY...MAX AGE IS 60"}),
            location:Joi.string().required(),
    })
}
}

