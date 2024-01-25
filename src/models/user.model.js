const { DataTypes } = require('sequelize');
const { Db } = require('../helpers/db');

const UserModel = {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    primarykey: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}

const User = new Db().getConnection().define('User', UserModel);

exports.User = User
exports.UserModel = UserModel