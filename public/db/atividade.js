const Sequelize = require('sequelize');
const database = require('./db');

const Atividade = database.define('atividade', {
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
    titulo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    data_inicio: {
        type: Sequelize.DATE,
        allowNull: false
    },
    data_fim: {
        type: Sequelize.DATE,
        allowNull: true
    },
    id_usuario: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    id_rotulo: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    id_situacao: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'atividade'
});

// Atividade.getAtividades = (idUsuario) => {
//     return Atividade.find({ where: { id_usuario: idUsuario }}).then((atividades) => {
//         if (atividades)
//             return {success: true, result: atividades};
//         else
//             return {success: false};
//     });
// }
Atividade.getAtividades = async (usuario) => {
    let resultado = await Atividade.findAll({ where: { id_usuario: usuario}});

    return resultado;
}

Atividade.getAtividade = async (idUsuario, idAtividade) => {
    let  resultado = Atividade.findOne({ where: { id: idAtividade, id_usuario: idUsuario } });

    return resultado;
}

Atividade.createAtividade = async (atividade) => {

    return await Atividade.create(atividade);
};

module.exports = Atividade;