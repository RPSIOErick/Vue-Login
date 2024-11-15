const Professor = require('../models/tb_Professor');
const { bcrypt } = require('../imports/imports');

const createProfessor = async (req, res) => {
    try {
        const { Nome, RM } = req.body;
        
        // Verificar se os dados estão vindo no body
        console.log('Dados recebidos:', { Nome, RM});

        // Hash da senha
        const saltRounds = 10;
        const newSenha = await bcrypt.hash(RM, saltRounds)

        // Pré-Status
        const preStatus = 1;

        // Criar a professor no banco de dados
        const professor = await Professor.create({ Nome, RM, Senha: newSenha, Status: preStatus });
        
        // Retorna a professor criada
        res.status(201).json(professor);
    } catch (error) {
        // Log do erro para ver os detalhes
        console.error('Erro ao criar professor:', error);

        res.status(500).json({ error: "Erro ao criar professor." });
    }
};
const readProfessor = async (req, res) => {
    try {
        // Faz a leitura das professores no banco de dados
        const professores = await Professor.findAll();
        
        // Retorna as professores encontradas
        res.send(professores);
    } catch (error) {
        console.error("Erro ao buscar professor: ", error);
        res.status(500).json({ error: "Erro ao buscar professor." });
    }
};

const updateProfessor = async (req, res) => {
    try {
        const { id } = req.params; // ID da professor que será atualizada
        const { Nome, RM, Senha, Status } = req.body; // Dados atualizados da professor

        // Verificar se a professor existe no banco
        const professor = await Professor.findByPk(id);
        if (!professor) {
            return res.status(404).json({ error: "Professor não encontrado." });
        }

        // Atualizar os dados da professor
        await professor.update({ Nome, RM, Senha, Status });

        // Retorna a professor atualizada
        res.json({ message: "Professor atualizado com sucesso!", professor });
    } catch (error) {
        console.error("Erro ao atualizar professor: ", error);
        res.status(500).json({ error: "Erro ao atualizar professor." });
    }
};

const changeStatusProfessor = async (req, res) => {
    try {
        const { id } = req.params; // ID da professor que será excluída

        // Verificar se a professor existe no banco
        const professor = await Professor.findByPk(id);
        if (!professor) {
            return res.status(404).json({ error: "Professor não encontrado." });
        }

        const professorStatus = !professor.Status
        // Inativar professor
        await professor.update({ Status: professorStatus });

        // Retorna uma mensagem de sucesso
        res.json({ message: "Professor editado com sucesso!" });
    } catch (error) {
        console.error("Erro ao excluir professor: ", error);
        res.status(500).json({ error: "Erro ao excluir professor." });
    }
};

const readUniProf = async (req, res) => {
    try {
        const { id } = req.params; // ID da professor que será excluída

        // Verificar se a professor existe no banco
        const professor = await Professor.findByPk(id);
        if (!professor) {
            return res.status(404).json({ error: "Professor não encontrado." });
        }


        // Retorna uma mensagem de sucesso
        res.json(professor);
    } catch (error) {
        console.error("Erro ao excluir professor: ", error);
        res.status(500).json({ error: "Erro ao excluir professor." });
    }

}
module.exports = {
    createProfessor,
    readProfessor,
    updateProfessor,
    changeStatusProfessor,
    readUniProf
};