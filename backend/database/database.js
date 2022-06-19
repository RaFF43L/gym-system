const Sequelize = require("sequelize");

const connection = new Sequelize('filmaria','postgres', '96340213',{
    host: 'localhost',
    dialect: 'postgres'
});

module.exports = connection;