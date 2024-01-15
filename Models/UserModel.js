const { DataTypes } = require('sequelize');

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

exports.UserModel = UserModel