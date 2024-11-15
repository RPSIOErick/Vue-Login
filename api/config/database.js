// Import
const { Sequelize } = require('../imports/imports')

// Database connection
const sequelize = new Sequelize('bd_pi', 'root', 'TURUca2020**', {
    host: 'localhost',
    dialect: 'mysql'
})

// Connection Test
const testConn = async () => {
    try {
        await sequelize.authenticate();
        console.log("Conexão feita com sucesso.");
    }
    catch(error){
        console.log("Não foi possível se conectar ao banco de dados:", error)
    }
}

// Module Export
module.exports = {
    sq: sequelize, testConn
}