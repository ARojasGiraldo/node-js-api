const express = require('express');
const CategoriesServices = require('../services/cateories.services');

const router = express.Router();

const categories = new CategoriesServices();

router.get('/', (req, res) => {
  try {
    const category = categories.find();
    res.json(category);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
});

router.get('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const category = categories.findOne(id);
    res.json(category);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
});

router.post('/', (req, res) => {
  try {
    const body = req.body;
    const newCategory = categories.created(body);
    res.status(201).json(newCategory);
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
    const editcAtegory = categories.update(id, body);
    res.json(editcAtegory);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
});

router.delete('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const rta = categories.delete(id);
    res.json(rta);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
});

module.exports = router;
