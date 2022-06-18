const Sequelize = require('sequelize');
const database = require('./db');

const Situacao = database.define('situacao', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    descricao: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    tableName: 'situacao'
});

Situacao.getSituacoes = async () => {
    return await Situacao.findAll();
}

Situacao.getSituacao = async (idSituacao) => {
    return await Situacao.findOne({ where: { id: idSituacao } });
}

module.exports = Situacao;