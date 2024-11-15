const { DataTypes } = require('sequelize');
const { sq } = require('../config/database');

const Aluno = sq.define('Aluno', {
    Cod_Aluno: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Cod_Curso: {
      type: DataTypes.INTEGER,
      references: {
        model: 'tb_Cursos',
        key: 'Cod_Curso',
      }
    },
    Representante: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    Nome: {
      type: DataTypes.STRING,
      allowNull: false
    },
    RA: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    Senha: {
      type: DataTypes.STRING,
      allowNull: false,
    }
}, {
    tableName: 'tb_Aluno',
    timestamps: false
});

module.exports = Aluno;
  
  