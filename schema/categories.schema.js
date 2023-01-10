const Joi = require('joi');

const id = Joi.string().uuid();
const name = Joi.string().max(60).min(8);
const price = Joi.number().integer().min(10);
const image = Joi.string().uri();

const createCategoriesSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  image: image.required(),
});

const updateCategoriesSchema = Joi.object({
  name: name,
  price: price,
  image: image,
});

const getCategoriesSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  getCategoriesSchema,
  updateCategoriesSchema,
  createCategoriesSchema,
};
