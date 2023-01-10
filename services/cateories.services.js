const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');

class CategoriesServices {
  constructor() {
    this.categories = [];
    this.generate();
  }

  generate() {
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.categories.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productDescription(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean(),
      });
    }
  }

  async create(data) {
    const newCategories = {
      id: faker.datatype.uuid(),
      ...data,
    };
    this.categories.push(newCategories);
    return newCategories;
  }

  async update(id, changes) {
    const index = this.categories.findIndex((item) => item.id === id);
    if (index === -1) {
      throw boom.notFound('category not found');
    }
    const category = this.categories[index];
    this.categories[index] = {
      ...category,
      ...changes,
    };
    return this.categories[index];
  }

  async delete(id) {
    const index = this.categories.findIndex((item) => item.id === id);
    if (index === -1) {
      throw boom.notFound('category not found');
    }
    this.categories.splice(index, 1);
    return { id };
  }

  find() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.categories);
      }, 3000);
    });
  }

  async findOne(id) {
    const category = this.categories.find((item) => item.id === id);
    if (!category) {
      throw boom.notFound('category not found');
    }
    if (category.isBlock) {
      throw boom.conflict('category is block');
    }
    return category;
  }
}

module.exports = CategoriesServices;
