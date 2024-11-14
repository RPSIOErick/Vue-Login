const { app } = require('./config/config')
const api = require('./routes/api')

app.use('/api', api)

module.exports = app