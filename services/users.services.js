const pool = require('../libs/postgre.pool');
const { models } = require('../libs/sequelize');
class UserService {
  constructor() {
    (this.users = []),
      (this.pool = pool),
      this.pool.on('error', (err) => console.error(err));
  }

  async create(data) {
    return data;
  }

  async find() {
    const rta = await models.user.findAll();
    return rta;
  }

  async findOne(id) {
    return { id };
  }

  async update(id, changes) {
    return {
      id,
      changes,
    };
  }

  async delete(id) {
    return { id };
  }
}

module.exports = UserService;
