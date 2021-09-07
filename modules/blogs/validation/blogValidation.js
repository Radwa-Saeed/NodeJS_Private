const Joi = require("joi")
module.exports={
    blogSchemaValidation :{
        body:Joi.object().required().keys({
            title:Joi.string().required(),
            content:Joi.string().required(),
            createdby:Joi.required(),
        })
    }
}
