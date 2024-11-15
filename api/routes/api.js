// Import Express Instance
const express = require('express');
const multer = require('multer');

// Import Controllers

const alunoController = require('../controllers/alunoController')
const disciplinasController = require('../controllers/disciplinasController')
const professorController = require('../controllers/professorController')
const cursoController = require('../controllers/cursoController')
const turmaController = require('../controllers/turmaController')
const authController = require('../controllers/authController')

// Import Middleware
const { verifyToken } = require('../middlewares/auth')

const storage = multer.memoryStorage()
const upload = multer({ storage })

const router = express.Router()

// Routes - Aluno
router.post('/aluno/create', alunoController.createAluno)

router.post('/aluno/upload', upload.single('csv'), alunoController.readAlunoFile)

router.get('/aluno/read', alunoController.readAluno)

router.get('/aluno/read/:id', alunoController.readUniAluno)

router.put('/aluno/update/:id', alunoController.updateAluno)

router.delete('/aluno/delete/:id', alunoController.deleteAluno)


// Routes - Disciplinas
router.post('/disciplinas/create', disciplinasController.createDisciplinas)

router.get('/disciplinas/read', disciplinasController.readDisciplinas)

router.put('/disciplinas/update/:id', disciplinasController.updateDisciplinas)

router.delete('/disciplinas/delete/:id', disciplinasController.deleteDisciplinas)

router.get('/disciplinas/read/:id', disciplinasController.readUniDisc)

//Routes - Professor

router.post('/professor/create', professorController.createProfessor)

router.get('/professor/read', professorController.readProfessor)

router.put('/professor/update/:id', professorController.updateProfessor)

router.put('/professor/status/:id', professorController.changeStatusProfessor)

router.get('/professor/read/:id', professorController.readUniProf)

//Routes - Curso

router.post('/curso/create', cursoController.createCurso)

router.get('/curso/read', cursoController.readCurso)

router.put('/curso/update/:id', cursoController.updateCurso)

router.put('/curso/status/:id', cursoController.changeStatusCurso)

router.get('/curso/read/:id', cursoController.readUniCurso)

//Routes - Turma
router.post('/turma/upload', upload.single('csv'), turmaController.readTurmaFile)

router.post('/turma/create', turmaController.createTurma)

router.get('/turma/read', turmaController.readTurmas)

router.get('/turma/read/:id', turmaController.readUniTurma)

router.patch('/turma/update/:id', turmaController.updateTurma);

//Routes - Auth

router.post('/professor/register', authController.createProfessor)

router.post('/professor/login', authController.loginProfessor)

router.post('/aluno/login', authController.loginAluno)

// Export Module
module.exports = router;