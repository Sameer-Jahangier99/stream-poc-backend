const Joi = require('joi')

const userSignupSchema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().required(),
  image: Joi.string().optional(),
});

const userLoginSchema = Joi.object({
  id: Joi.string().required(),
});

const userLogoutSchema = Joi.object({
  token: Joi.string().required(),
});



module.exports = { userSignupSchema, userLoginSchema, userLogoutSchema };