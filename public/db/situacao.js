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
});

Situacao.getSituacoes = () => {
    return Situacao.find().then((situacoes) => {
        if (situacoes)
            return {success: true, result: situacoes};
        else
            return {success: false};
    });
}

Situacao.getSituacao = (idSituacao) => {
    return Situacao.findOne({ where: { id: idSituacao } }).then((situacao) => {
        if (situacao)
            return {success: true, result: situacao};
        else
            return {success: false};
    });
}