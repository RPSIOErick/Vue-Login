// Import Aluno's Model
const Aluno = require('./tb_Aluno');
const Cursos = require('./tb_Cursos');
const Disciplinas = require('./tb_Disciplinas');
const Permissao = require('./tb_Permissao');
const Professor = require('./tb_Professor');
const Tipo_Prof = require('./tb_Tipo_Prof');
const Turmas = require('./tb_Turmas');

// Async function to sync tables
async function syncTables() {
    try {
        await Tipo_Prof.sync();
        console.log("Tabela tb_tipo_prof criada com sucesso!");

        await Professor.sync();
        console.log("Tabela tb_professor criada com sucesso!");

        await Permissao.sync();
        console.log("Tabela tb_permissao criada com sucesso!");

        await Disciplinas.sync();
        console.log("Tabela tb_disciplinas criada com sucesso!");

        await Cursos.sync();
        console.log("Tabela tb_cursos criada com sucesso!");

        await Aluno.sync();
        console.log("Tabela tb_alunos criada com sucesso!");

        await Turmas.sync();
        console.log("Tabela tb_turmas criada com sucesso!");
    } catch (error) {
        console.error("Erro ao sincronizar tabelas: ", error);
    }
}

// Sync funcion
syncTables();