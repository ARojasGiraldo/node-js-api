const Joi = require('joi');

const id = Joi.string().uuid();
const name = Joi.string().max(60).min(8);
const email = Joi.string().email();

const createUserSchema = Joi.object({
  name: name.required(),
  email: email.required(),
});

const updateUserSchema = Joi.object({
  name: name,
  email: email,
});

const getUserSchema = Joi.object({
  id: id.required(),
});

module.exports = { createUserSchema, updateUserSchema, getUserSchema };
