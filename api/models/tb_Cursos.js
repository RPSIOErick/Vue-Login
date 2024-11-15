const { DataTypes } = require('sequelize');
const { sq } = require('../config/database');


const Cursos = sq.define('Cursos', {
    Cod_Curso: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Nome_Curso: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Tipo_Trabalho: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    Descricao_Trabalho: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ID_Prof: {
      type: DataTypes.INTEGER,
      references: {
        model: 'tb_Professor',
        key: 'ID_Prof',
      }
    },
    Tipo_Curso: {
      type: DataTypes.STRING,
      allowNull: false,
    }
}, {
    tableName: 'tb_Cursos',
    timestamps: false
  });

  module.exports = Cursos;
  