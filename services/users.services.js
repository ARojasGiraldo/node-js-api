const { faker } = require('@faker-js/faker');

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
      });
    }
  }

  created(data) {
    const newUser = {
      id: faker.datatype.uuid,
      ...data,
    };
    this.users(newUser);
    return newUser;
  }

  update(id, changes) {
    const index = this.users.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new Error('product not found');
    }
    const user = this.users[index];
    this.users[index] = {
      ...user,
      ...changes,
    };
    return this.users[index];
  }

  delete(id) {
    const index = this.users.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new Error('product not found');
    }
    this.users.splice(index, 1);
    return { id };
  }

  find() {
    return this.user;
  }

  findOne(id) {
    return this.user.find((item) => item.id === id);
  }
}

module.exports = UsersServices;
