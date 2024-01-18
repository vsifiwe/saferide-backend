const { DataTypes } = require('sequelize');
const { Db } = require('../helpers/db');

const MessageModel = {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    message: {
        type: DataTypes.STRING,
        allowNull: false
    }
}

const Message = new Db().getConnection().define('Message', MessageModel);

exports.Message = Message