let joi = require('joi');

let listingSchema = joi.object({
    listing:joi.object({
        Title:joi.string().required(),
        Description:joi.string().required(),
        Image:joi.string().allow("",null),
        Price:joi.number().required().min(0),
        Location:joi.string().required(),
        Country:joi.string().required()
    })
})

module.exports=listingSchema;