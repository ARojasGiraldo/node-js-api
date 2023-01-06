const express = require('express');
const UsersServices = require('../services/users.services');

const router = express.Router();

const users = new UsersServices();

router.get('/', (req, res) => {
  try {
    const user = users.find();
    res.json(user);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
});

router.get('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const user = users.findOne(id);
    res.json(user);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
});

router.post('/', (req, res) => {
  try {
    const body = req.body;
    const newUser = users.created(body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
});

router.patch('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const user = users.update(id, body);
    res.json(user);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
});

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
