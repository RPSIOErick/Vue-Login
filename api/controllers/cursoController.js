const Curso = require('../models/tb_Cursos');

const createCurso = async (req, res) => {
    try {
        const { Cod_Curso, Nome_Curso, Tipo_Trabalho, Status, Descricao_Trabalho, ID_Prof,Tipo_Curso } = req.body;
        
        // Verificar se os dados estão vindo no body
        console.log('Dados recebidos:', { Cod_Curso, Nome_Curso, Tipo_Trabalho, Status, Descricao_Trabalho, ID_Prof,Tipo_Curso });

        // Criar o curso no banco de dados
        const curso = await Curso.create({ Cod_Curso, Nome_Curso, Tipo_Trabalho, Status, Descricao_Trabalho, ID_Prof,Tipo_Curso });
        
        // Retorna o curso criado
        res.status(201).json(curso);
    } catch (error) {
        // Log do erro para ver os detalhes
        console.error('Erro ao criar curso:', error);

        res.status(500).json({ error: "Erro ao criar curso." });
    }
};

const readCurso = async (req, res) => {
    try {
        // Faz a leitura dos cursos no banco de dados
        const cursos = await Curso.findAll();
        
        // Retorna os cursos encontrados
        res.send(cursos);
    } catch (error) {
        console.error("Erro ao buscar curso: ", error);
        res.status(500).json({ error: "Erro ao buscar curso." });
    }
};

const updateCurso = async (req, res) => {
    try {
        const { id } = req.params; // ID do curso que será atualizado
        const { Cod_Curso, Nome_Curso, Tipo_Trabalho, Status, Descricao_Trabalho, ID_Prof,Tipo_Curso } = req.body; // Dados atualizados do curso

        // Verificar se o curso existe no banco
        const curso = await Curso.findByPk(id);
        if (!curso) {
            return res.status(404).json({ error: "Curso não encontrado." });
        }

        // Atualizar os dados do curso
        await curso.update({ Cod_Curso, Nome_Curso, Tipo_Trabalho, Status, Descricao_Trabalho, ID_Prof,Tipo_Curso });

        // Retorna o curso atualizado
        res.json({ message: "Curso atualizado com sucesso!", curso });
    } catch (error) {
        console.error("Erro ao atualizar curso: ", error);
        res.status(500).json({ error: "Erro ao atualizar curso." });
    }
};

const changeStatusCurso = async (req, res) => {
    try {
        const { id } = req.params; // ID do curso que será excluído

        // Verificar se o curso existe no banco
        const curso = await Curso.findByPk(id);
        if (!curso) {
            return res.status(404).json({ error: "Curso não encontrado." });
        }

        // Arquivar o curso
        const cursoStatus = !curso.Status
        await curso.update({ Status: cursoStatus });

        // Retorna uma mensagem de sucesso
        res.json({ message: "Curso alterado com sucesso!" });
    } catch (error) {
        console.error("Erro ao excluir curso: ", error);
        res.status(500).json({ error: "Erro ao excluir curso." });
    }
};

const readUniCurso = async (req, res) => {
    try {
        const { id } = req.params; // ID do curso que será excluído

        // Verificar se o curso existe no banco
        const curso = await Curso.findByPk(id);
        if (!curso) {
            return res.status(404).json({ error: "Curso não encontrado." });
        }


        // Retorna uma mensagem de sucesso
        res.json(curso);
    } catch (error) {
        console.error("Erro ao excluir curso: ", error);
        res.status(500).json({ error: "Erro ao excluir curso." });
    }

}
module.exports = {
    createCurso,
    readCurso,
    updateCurso,
    changeStatusCurso,
    readUniCurso
};