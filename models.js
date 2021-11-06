const sequilize = require('./db')
const {DataTypes} = require('sequelize')

const User = sequilize.define('user', {
  id: {type: DataTypes.INTEGER, primaryKey: true, unicode: true, autoIncrement: true},
  chatId: {type: DataTypes.STRING, unicode: true},
  right: {type: DataTypes.INTEGER, defaultValue: 0},
  wrong: {type: DataTypes.INTEGER, defaultValue: 0},

})

module.exports = User;