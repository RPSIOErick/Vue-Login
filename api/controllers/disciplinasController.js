const Disciplinas = require('../models/tb_Disciplinas');
const Turmas = require('../models/tb_Turmas')

const createDisciplinas = async (req, res) => {
    try {
        const { ID_Disc, ID_Prof, Nome_Disc } = req.body;
        
        // Verificar se os dados estão vindo no body
        console.log('Dados recebidos:', { ID_Disc, ID_Prof, Nome_Disc});

        // Criar a disciplina no banco de dados
        const disciplinas = await Disciplinas.create({ ID_Disc, ID_Prof, Nome_Disc });
        
        // Retorna a disciplina criada
        res.status(201).json(disciplinas);
    } catch (error) {
        // Log do erro para ver os detalhes
        console.error('Erro ao criar disciplina:', error);

        res.status(500).json({ error: "Erro ao criar disciplina." });
    }
};

const readDisciplinas = async (req, res) => {
    try {
        // Faz a leitura das disciplinas no banco de dados
        const disciplinas = await Disciplinas.findAll();
        
        // Retorna as disciplinas encontradas
        res.send(disciplinas);
    } catch (error) {
        console.error("Erro ao buscar disciplinas: ", error);
        res.status(500).json({ error: "Erro ao buscar disciplinas." });
    }
};

const updateDisciplinas = async (req, res) => {
    try {
        const { id } = req.params; // ID da disciplina que será atualizada
        const { ID_Prof, Nome_Disc } = req.body; // Dados atualizados da disciplina

        // Verificar se a disciplina existe no banco
        const disciplina = await Disciplinas.findByPk(id);
        if (!disciplina) {
            return res.status(404).json({ error: "Disciplina não encontrada." });
        }

        // Atualizar os dados da disciplina
        await disciplina.update({ ID_Prof, Nome_Disc });

        // Retorna a disciplina atualizada
        res.json({ message: "Disciplina atualizada com sucesso!", disciplina });
    } catch (error) {
        console.error("Erro ao atualizar disciplina: ", error);
        res.status(500).json({ error: "Erro ao atualizar disciplina." });
    }
};

const deleteDisciplinas = async (req, res) => {
    try {
        const { id } = req.params; // ID da disciplina que será excluída

        // Verificar se a disciplina existe no banco
        const disciplina = await Disciplinas.findByPk(id);
        if (!disciplina) {
            return res.status(404).json({ error: "Disciplina não encontrada." });
        }

        const turma = await Turmas.findAll({ where: { ID_Disc: id } });

        if (!turma.length) {
    
            // Excluir a disciplina
            await disciplina.destroy();

            // Retorna uma mensagem de sucesso
            res.json({ message: "Disciplina excluída com sucesso!" });

        }

        res.status(400).json({ error: "Disciplina não pode ser excluída, pois está vinculada a uma turma." });

    } catch (error) {
        console.error("Erro ao excluir disciplina: ", error);
        res.status(500).json({ error: "Erro ao excluir disciplina." });
    }
};

const readUniDisc = async (req, res) => {
    try {
        const { id } = req.params; // ID da disciplina que será excluída

        // Verificar se a disciplina existe no banco
        const disciplina = await Disciplinas.findByPk(id);
        if (!disciplina) {
            return res.status(404).json({ error: "Disciplina não encontrada." });
        }


        // Retorna uma mensagem de sucesso
        res.json(disciplina);
    } catch (error) {
        console.error("Erro ao excluir disciplina: ", error);
        res.status(500).json({ error: "Erro ao excluir disciplina." });
    }

}
module.exports = {
    createDisciplinas,
    readDisciplinas,
    updateDisciplinas,
    deleteDisciplinas,
    readUniDisc
};
