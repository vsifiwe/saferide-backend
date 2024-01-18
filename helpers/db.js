const { Sequelize } = require('sequelize');

class Db{
    constructor(){
        this.sequelize = new Sequelize({
            dialect: "sqlite",
            storage: "db.sqlite"
        })
    }

    getConnection(){
        return this.sequelize
    }
}

exports.Db = Db