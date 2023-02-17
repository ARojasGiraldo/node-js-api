const { Model, DataTypes, Sequelize } = require('sequelize');

const USER_TABLE = 'users';

const userSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaulValue: Sequelize.NOW,
  },
};

class user extends Model {
  static associations() {}
  static config(sequelize) {
    return {
      sequelize,
      tableName: USER_TABLE,
      moduleName: 'user',
      timesemps: false,
    };
  }
}

module.exports = { user, userSchema, USER_TABLE };
