const {Sequelize} = require('sequelize');

module.exports = new Sequelize(
  'telegram-bot',
  'username',
  'password',
  {
    host: '',
    port: '',
    dialect: 'postgres'
  }
)