// Libs Imports

    // Import Express
    const express = require('express')

    // Import Body-Parser
        const bodyParser = require('body-parser')

    // Import Sequelize
        const Sequelize = require('sequelize')

    // Import JWT
        const jwt = require('jsonwebtoken')

    // Import Bcrypt
        const bcrypt = require('bcrypt')

    // Import Cors
        const cors = require('cors')

// End - Libs Imports

module.exports = {
    express,
    bodyParser,
    Sequelize,
    jwt,
    bcrypt,
    cors
}