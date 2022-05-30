const Sequelize = require('sequelize');
const database = require('./db');
const Usuario = require('./usuario');

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
    }
});
Rotulo.belongsTo(Usuario, { foreignKey: "id_usuario", targetKey: "id" });

Rotulo.getRotulos = (idUsuario) => {
    return Rotulo.find({ where: { id_usuario: idUsuario }}).then((rotulos) => {
        if (rotulos)
            return {success: true, result: rotulos};
        else
            return {success: false};
    });
}

Rotulo.getRotulo = (idRotulo, idUsuario) => {
    return Rotulo.findOne({ where: { id: idRotulo, id_usuario: idUsuario } }).then((rotulo) => {
        if (rotulo)
            return {success: true, result: rotulo};
        else
            return {success: false};
    });
}