const { Db } = require('../helpers/db');
const { UserModel } = require('../models/User.model');
const { MessageModel } = require('../models/message.model');

async function initializeDb(req, res) {
    // initialize db and tables

    const sequelize = new Db().getConnection();
    sequelize.define('User', UserModel);
    sequelize.define('Message', MessageModel)

    sequelize.sync().then(() => {
        res.send('Tables created successfully');
    }).catch((error) => {
        res.send('Unable to create tables : ' + error);
    });
}


exports.initializeDb = initializeDb;