// Model imports
const Professor = require('../models/tb_Professor');
const tipo_Prof = require('../models/tb_Tipo_Prof');
const Permissao = require('../models/tb_Permissao');

// Lib and config imports
const { bcrypt, jwt } = require('../imports/imports');
const { JWT_SECRET } = require('../config/config');

// Function to create a new professor
const createProfessor = async (req, res) => {

    try {

        const { name, password, rm, roles } = req.body;

        const professorExists = await Professor.findOne({ where: { RM: rm } })

        // Verify if there is any existing teachers
        if(professorExists){

            return res.status(400).json({ message: 'Professor já existe' })

        }
        
        // Hashing the password
        const saltRounds = 10;
        const newSenha = await bcrypt.hash(password, saltRounds)

        // Pre-status of the teacher (Active, it is a Boolean value in the Database)
        const preStatus = 1;

        // Craeting the teacher
        const professor = await Professor.create({ Nome: name, RM: rm, Senha: newSenha, Status: preStatus })
        
        // Putting the info on the console.log for debugging
        console.log(name, newSenha, rm, preStatus, roles)

        // Sending the info to create the roles
        await verifyPermissoes(professor, roles, res);

    }
    catch(err) {
        console.log(err)
        return res.status(500).json({ message: 'Erro ao criar professor' })
    }

}

// Function to login in as a teacher
const loginProfessor = async (req, res) => {

    try {
        
        const { rm, password } = req.body;

        // Verify if the teacher exists
        const prof = await Professor.findOne({ where: { RM: rm } })

        if(!prof){
            return res.status(404).json({ message: 'Professor não encontrado' })
        }

        // Verify if the password is correct
        const isMatch = await bcrypt.compare(password, prof.Senha)

        if(!isMatch){
            return res.status(401).json({ message: 'Senha incorreta' })
        }

        // Get the roles of the teacher
        const permissoes = await Permissao.findAll({ where: { ID_Prof: prof.ID_Prof } })

        // Mapping the roles to get the names of them
        const permissoesNomes = await Promise.all(
            permissoes.map(async (permissao) => {
                const tipoProf = await tipo_Prof.findOne({ where: { ID_Tipo_Prof: permissao.ID_Tipo_Prof } });
                return tipoProf.Nome;
            })
        );

        // Creating a token with the teacher's info (ID, RM, Name and Roles)
        const token = jwt.sign(
            { id: prof.ID_Prof, rm: prof.RM, nome: prof.Nome, permissoes: permissoesNomes }, //Setting what will be in the token
            JWT_SECRET, // Setting the secret
            { expiresIn: '1h' } // Setting the expiration time
        );

        // Returning the token
        // 🦊 -> I've choose to send only the token 'cuz it's easier to manipulate this way
        return res.json(token)

    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Erro ao fazer login' })
    }

}

// Function to verify the roles of a teacher
async function verifyPermissoes(professor, roles, res) {

    try {

        // Array to keep the roles
        const permissoes = []

        // For each role, get the ID of the role
        for(let role of roles) {

            const permissaoResult = await tipo_Prof.findOne({ where: { Nome: role } })
            permissoes.push(permissaoResult) // Push the role to the array

        }

        // If there are any role, then create a link between the teacher and the role
        if(permissoes.length > 0){

            const professorCreated = await Professor.findOne({ where: { RM: professor.RM } })

            for (let permissao of permissoes) {
                await Permissao.create({ ID_Prof: professorCreated.ID_Prof, ID_Tipo_Prof: permissao.ID_Tipo_Prof })
            }
            

        }

        return res.status(200).json({ message: 'Permissão colocada no array com sucesso', permissoes })

    }
    catch(err) {
        console.log(err)
        return res.status(500).json({ message: 'Erro ao criar permissão' })
    }

}

module.exports = {
    createProfessor,
    loginProfessor
}