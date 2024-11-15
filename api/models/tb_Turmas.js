const { DataTypes } = require('sequelize');
const { sq } = require('../config/database');


const Turmas = sq.define('Turmas', {
    Nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Turno: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Semestre: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Ano: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Cod_Aluno: {
      type: DataTypes.INTEGER,
      references: {
        model: 'tb_Aluno',
        key: 'Cod_Aluno',
      }
    },
    ID_Disc: {
      type: DataTypes.INTEGER,
      references: {
        model: 'tb_Disciplinas',
        key: 'ID_Disc',
      }
    },
    Status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    }

}, {
    tableName: 'tb_Turma',
    timestamps: false,
    id: false,
});

Turmas.removeAttribute('id');

module.exports = Turmas;
  