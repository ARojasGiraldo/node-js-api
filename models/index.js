const { user, userSchema } = require('./user.models');

function setupModels(sequelize) {
  user.init(userSchema, user.config(sequelize));
}

module.exports = setupModels;
