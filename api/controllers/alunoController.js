const xlsx = require('xlsx');
const Aluno = require('../models/tb_Aluno');
const { bcrypt } = require('../imports/imports');

const createAluno = async (req, res) => {
    try {
        const { Cod_Curso, Nome, RA } = req.body;
        
        // Verificar se os dados estão vindo no body
        console.log('Dados recebidos:', { Cod_Curso, Nome, RA });

        // Pré Status
        const preStatus = 0;
        
        // Hash da senha
        const saltRounds = 10;
        const newSenha = await bcrypt.hash(RA, saltRounds)

        // Criar o aluno no banco de dados
        const aluno = await Aluno.create({ Cod_Curso, Representante: preStatus, Nome, RA, Senha: newSenha });
        
        // Retorna o aluno criado
        res.status(201).json(aluno);
    } catch (error) {
        // Log do erro para ver os detalhes
        console.error('Erro ao criar aluno:', error);

        res.status(500).json({ error: "Erro ao criar alunos." });
    }
};

const readAluno = async (req, res) => {
    try {
        // Faz a leitura dos alunos no banco de dados
        const alunos = await Aluno.findAll();
        
        // Retorna os alunos encontradas
        res.send(alunos);
    } catch (error) {
        console.error("Erro ao buscar aluno: ", error);
        res.status(500).json({ error: "Erro ao buscar aluno." });
    }
};

const readUniAluno = async (req, res) => {
    try {
        // Faz a leitura dos alunos no banco de dados

        const { id } = req.params

        const aluno = await Aluno.findByPk(id);
        
        // Retorna os alunos encontradas
        res.send(aluno);
    } catch (error) {
        console.error("Erro ao buscar aluno: ", error);
        res.status(500).json({ error: "Erro ao buscar aluno." });
    }
};

const updateAluno = async (req, res) => {
    try {
        const { id } = req.params; // ID do aluno que será atualizado
        const { Cod_Curso, Representante, Nome, RA, Senha} = req.body; // Dados atualizados do aluno

        // Verificar se a aluno existe no banco
        const aluno = await Aluno.findByPk(id);
        if (!aluno) {
            return res.status(404).json({ error: "Aluno não encontrado." });
        }

        // Atualizar os dados da aluno
        await aluno.update({ Cod_Curso, Representante, Nome, RA, Senha });

        // Retorna a aluno atualizado
        res.json({ message: "Aluno atualizado com sucesso!", aluno });
    } catch (error) {
        console.error("Erro ao atualizar aluno: ", error);
        res.status(500).json({ error: "Erro ao atualizar aluno." });
    }
};

const deleteAluno = async (req, res) => {
    try {

        const { id } = req.params; // ID do aluno que será excluído
        
        const aluno = await Aluno.findByPk(id); // Verificar se a aluno existe no banco

        if (!aluno) {
            return res.status(404).json({ error: "Aluno não encontrado." });
        }

        await aluno.destroy(); // Excluir a aluno

        res.json({ message: "Aluno excluído com sucesso!" });

    }
    catch (error) {
        console.error("Erro ao excluir aluno: ", error);
        res.status(500).json({ error: "Erro ao excluir aluno." });
    }
}

const readAlunoFile = async (req, res) => {
    try {
        // Verifica se o arquivo CSV foi enviado
        if (!req.file) {
            return res.status(400).json({ error: "Arquivo CSV não identificado." });
        }

        // Verifica se o Cod_Curso está no body
        const { Cod_Curso } = req.body;
        if (!Cod_Curso) {
            return res.status(400).json({ error: "Cod_Curso não fornecido no body." });
        }

        // Processa o arquivo CSV
        const sigaFile = req.file.buffer;
        const alunoWb = xlsx.read(sigaFile, { type: 'buffer' });
        const alunoWs = alunoWb.Sheets[alunoWb.SheetNames[0]];
        const data = xlsx.utils.sheet_to_json(alunoWs);

        // Verifica se há dados lidos
        if (data.length === 0) {
            return res.status(400).json({ error: "Nenhum dado encontrado no arquivo." });
        }

        // Mapeia os dados para incluir RA, Nome e Cod_Curso para cada aluno
        const alunosFiltrados = data.map((item) => ({
            RA: item["20241"] ? item["20241"].trim() : null,
            Nome: item["IAL021A "] ? item["IAL021A "].trim() : null,
            Cod_Curso: Cod_Curso
        }))
        .filter(aluno => aluno.RA && aluno.Nome && aluno.RA !== "RA" && aluno.Nome !== "ALUNO");

        // Retorna uma resposta antes de iniciar o processo de criação
        res.status(200).json({ message: "Processando a criação dos alunos.", totalAlunos: alunosFiltrados.length });

        // Chama a função para salvar os alunos no banco de dados
        await createAlunoExcel(alunosFiltrados);
    } catch (error) {
        console.error("Erro ao ler o arquivo: ", error);
        res.status(500).json({ error: "Erro ao ler o arquivo." });
    }
};

async function createAlunoExcel(alunosFiltrados) {
    try {

        const saltRounds = 10;

        // Usa Promise.all para salvar todos os alunos simultaneamente
        await Promise.all(alunosFiltrados.map(async (aluno) => {

            const newSenha = await bcrypt.hash(aluno.RA, saltRounds)

            const novoAluno = new Aluno({
                Cod_Curso: aluno.Cod_Curso,
                Representante: false,
                Nome: aluno.Nome,
                RA: aluno.RA,
                Senha: newSenha
            });

            await novoAluno.save();
            console.log(`Aluno ${aluno.Nome} criado com sucesso!`);
        }));

        console.log('Todos os alunos foram criados com sucesso!');
    } catch (error) {
        console.error('Erro ao criar alunos:', error);
    }
}


module.exports = {
    createAluno,
    readAlunoFile,
    readAluno,
    updateAluno,
    deleteAluno,
    readUniAluno
};