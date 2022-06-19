const Sequelize = require("sequelize");

const connection = require("../database/database");

const Students = connection.define('users', {
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    cpf: {
        type: Sequelize.STRING,
        allowNull: false
    },
    tipo: {
        type: Sequelize.CHAR,
        allowNull: false
    }
});
// User.sync({force: true}).then(()=>{
//     console.log('Tabela criada com sucesso!');
// }).catch((err)=>{
// console.log(err);
// });

module.exports = Students;