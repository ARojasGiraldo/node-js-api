const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');

class UsersServices {
  constructor() {
    this.users = [];
    this.generate();
  }

  generate() {
    const limit = 10;
    for (let index = 0; index < limit; index++) {
      this.users.push({
        id: faker.datatype.uuid(),
        name: faker.name.fullName(),
        email: faker.internet.email(),
        isBlock: faker.datatype.boolean(),
      });
    }
  }

  async created(data) {
    const newUser = {
      id: faker.datatype.uuid(),
      ...data,
    };
    this.users.push(newUser);
    return newUser;
  }

  async update(id, changes) {
    const index = this.users.findIndex((item) => item.id === id);
    if (index === -1) {
      throw boom.notFound('user not found');
    }
    const user = this.users[index];
    this.users[index] = {
      ...user,
      ...changes,
    };
    return this.users[index];
  }

  async delete(id) {
    const index = this.users.findIndex((item) => item.id === id);
    if (index === -1) {
      throw boom.notFound('product not found');
    }
    this.users.splice(index, 1);
    return { id };
  }

  find() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.users);
      }, 3000);
    });
  }

  async findOne(id) {
    const user = this.user.find((item) => item.id === id);
    if (!user) {
      throw boom.notFound('product not found');
    }
    if (user.isBlock) {
      throw boom.conflict('user is block');
    }
    return user;
  }
}

module.exports = UsersServices;
