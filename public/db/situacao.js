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

Situacao.sync({ force: true }).then(() => {
    Situacao.create({id: 1, descricao: 'Em aberto'});
    Situacao.create({id: 2, descricao: 'Em andamento'});
    Situacao.create({id: 3, descricao: 'Finalizada'});
    Situacao.create({id: 4, descricao: 'Cancelada'});
});

Situacao.getSituacoes = async () => {
    return await Situacao.findAll();
}

Situacao.getSituacao = async (idSituacao) => {
    return await Situacao.findOne({ where: { id: idSituacao } });
}

module.exports = Situacao;