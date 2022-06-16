const Sequelize = require('sequelize');
const database = require('./db');

const Usuario = database.define('usuario', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    usuario: {
        type: Sequelize.STRING,
        allowNull: false
    },
    senha: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    tableName: 'usuario'
});

Usuario.createUsuario = async (usuario, senha) => {
    return await Usuario.create({ usuario: usuario, senha: senha });
};

Usuario.validaLogin = async (usuario, senha) => {
    return await Usuario.findOne({ where: { usuario: usuario, senha: senha } });
}

module.exports = Usuario;