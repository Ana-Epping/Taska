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
});

// force: true will drop the table if it already exists
Usuario.sync({ force: true }).then(() => {
    // Table created
    return Usuario.create({
        usuario: 'admin',
        senha: 'admin'
    });
});

Usuario.validaLogin = (usuario, senha) => {
    return Usuario.findOne({ where: { usuario: usuario, senha: senha } }).then((usuario) => {
        if (usuario)
            return true;
        else
            return false;
    });
}

module.exports = Usuario;