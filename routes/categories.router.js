const express = require('express');
const CategoriesServices = require('../services/cateories.services');
const validatorHandler = require('../middlewares/validator.handler');
const {
  getCategoriesSchema,
  updateCategoriesSchema,
  createCategoriesSchema,
} = require('../schema/categories.schema');

const router = express.Router();

const categories = new CategoriesServices();

router.get('/', async (req, res) => {
  const category = await categories.find();
  res.json(category);
});

router.get(
  '/:id',
  validatorHandler(getCategoriesSchema, 'params'),
  async (res, req, next) => {
    try {
      const { id } = req.params;
      const category = categories.findOne(id);
      res.json(category);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  validatorHandler(createCategoriesSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const newcategory = await categories.create(body);
    res.status(201).json(newcategory);
  }
);

router.patch(
  '/:id',
  validatorHandler(getCategoriesSchema, 'params'),
  validatorHandler(updateCategoriesSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const category = await categories.update(id, body);
      res.json(category);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const rta = await categories.delete(id);
  res.json(rta);
});

module.exports = router;
