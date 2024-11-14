const { DataTypes } = require('sequelize');
const { sq } = require('../config/database');

const Professor = sq.define('Professor', {
    ID_Prof: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    RM: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Senha: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    }
  }, {
    tableName: 'tb_Professor',
    timestamps: false
  });

  module.exports = Professor;
  