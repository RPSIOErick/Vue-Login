const app = require('./app');
const { sq, testConn } = require('./config/database');

// Inicializar o servidor
let PORT = 8080;

sq.sync().then(() => { 
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch((err) => {
    console.error('Erro ao sincronizar o banco de dados:', err);
});
