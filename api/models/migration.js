// Import Aluno's Model

const Permissao = require('./tb_Permissao');
const Professor = require('./tb_Professor');
const Tipo_Prof = require('./tb_Tipo_Prof');

// Async function to sync tables
async function syncTables() {
    try {
        await Tipo_Prof.sync();
        console.log("Tabela tb_tipo_prof criada com sucesso!");

        await Professor.sync();
        console.log("Tabela tb_professor criada com sucesso!");

        await Permissao.sync();
        console.log("Tabela tb_permissao criada com sucesso!");

    } catch (error) {
        console.error("Erro ao sincronizar tabelas: ", error);
    }
}

// Sync funcion
syncTables();