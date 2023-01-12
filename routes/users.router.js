const express = require('express');
const UsersServices = require('../services/users.services');
const validatorHandler = require('../middlewares/validator.handler');
const {
  createUserSchema,
  getUserSchema,
  updateUserSchema,
} = require('../schema/user.schema');

const router = express.Router();

const users = new UsersServices();

router.get('/', async (req, res, next) => {
  try {
    const user = await users.find();
    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  validatorHandler(getUserSchema, 'params'),
  async (res, req, next) => {
    try {
      const { id } = req.params;
      const user = users.findOne(id);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  validatorHandler(createUserSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const newProduct = await users.created(body);
    res.status(201).json(newProduct);
  }
);

router.patch(
  '/:id',
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const user = await users.update(id, body);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const rta = users.delete(id);
    res.json(rta);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
});

module.exports = router;
