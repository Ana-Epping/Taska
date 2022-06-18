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
    }
}, {
    tableName: 'atividade'
});
    
// Atividade.belongsTo(Rotulo, { foreignKey: "id_rotulo", targetKey: "id" });
// Atividade.belongsTo(Situacao, { foreignKey: "id_situacao", targetKey: "id" });
// Atividade.belongsTo(Usuario, { foreignKey: "id_usuario", targetKey: "id" });

// Atividade.getAtividades = (idUsuario) => {
//     return Atividade.find({ where: { id_usuario: idUsuario }}).then((atividades) => {
//         if (atividades)
//             return {success: true, result: atividades};
//         else
//             return {success: false};
//     });
// }
Atividade.getAtividades = async () => {
    console.log('atividade');
    let resultado = await Atividade.findAll();

    return resultado;
}

Atividade.getAtividade = (idUsuario, idAtividade) => {
    return Atividade.findOne({ where: { id: idAtividade, id_usuario: idUsuario } }).then((atividade) => {
        if (atividade)
            return {success: true, result: atividade};
        else
            return {success: false};
    });
}

Atividade.createAtividade = async (atividade) => {

    return await Atividade.create({
        titulo: atividade['titulo'],
        descricao: atividade['descricao'],
        data_inicio: atividade['data_inicio'],
        data_fim: atividade['data_fim'] || null,
        // id_rotulo: atividade['id_rotulo'],
        // id_situacao: atividade['id_situacao'],
        id_usuario: atividade['usuario']
    });
};
module.exports = Atividade;