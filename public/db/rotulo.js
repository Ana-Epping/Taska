const Sequelize = require('sequelize');
const database = require('./db');

const Rotulo = database.define('rotulo', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    descricao: {
        type: Sequelize.STRING,
        allowNull: false
    },
    icon: {
        type: Sequelize.STRING,
        allowNull: true
    },
    color: {
        type: Sequelize.STRING,
        allowNull: true
    },
    id_usuario: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'rotulo'
});

Rotulo.createRotulo = async (rotulo) => {
    return await Rotulo.create(rotulo);
};

Rotulo.getRotuloUsuario = async (usuario) => {
    return await Rotulo.findOne({ where: { id_usuario: usuario } });
}

module.exports = Rotulo;