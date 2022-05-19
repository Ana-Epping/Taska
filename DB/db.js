const Sequelize = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './taska.sqlite'
  })
 
module.exports = sequelize;