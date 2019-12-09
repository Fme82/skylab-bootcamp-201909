const { Router } = require('express')
const { createClass, retrieveClass, deleteClass, createStudents, deleteStudent, addTeacher, deleteTeacher, listTeachers } = require('../../logic')
const jwt = require('jsonwebtoken')
const { env: { SECRET } } = process
const tokenVerifier = require('../../helpers/token-verifier')(SECRET)
const bodyParser = require('body-parser')
const { errors: { NotFoundError, ConflictError, CredentialsError } } = require('lambda-util')

const jsonBodyParser = bodyParser.json()

const router = Router()

router.post('/', tokenVerifier, jsonBodyParser, (req, res) => {
    const { id, body: { name } } = req
debugger
    try {
        createClass(id, name)
            .then(id => res.status(201).json( id ))
            .catch(error => {
                const { message } = error

                if (error instanceof ConflictError)
                    return res.status(409).json({ message })

                res.status(500).json({ message })
            })
    } catch ({ message }) {
        res.status(400).json({ message })
    }
})


router.delete('/:classId', tokenVerifier, (req, res) => {
    try {
        const { id,  params: { classId } } = req

        deleteClass(id, classId)
            .then(() =>
                res.end()
            )
            .catch(error => {
                const { message } = error

                if (error instanceof NotFoundError)
                    return res.status(404).json({ message })
                if (error instanceof ConflictError)
                    return res.status(409).json({ message })

                res.status(500).json({ message })
            })
    } catch ({ message }) {
        res.status(400).json({ message })
    }
})


router.post('/student/:idClassroom', tokenVerifier, jsonBodyParser, (req, res) => {
    const { id, params: {idClassroom}, body: { name, surname, email } } = req

    try {
        createStudents(id, idClassroom, name, surname, email)
            .then(() => res.status(201).end())
            .catch(error => {
                const { message } = error

                if (error instanceof ConflictError)
                    return res.status(409).json({ message })

                res.status(500).json({ message })
            })
    } catch ({ message }) {
        res.status(400).json({ message })
    }
})

router.delete('/student', jsonBodyParser, (req, res) => {
    try {
    
        const {  body: { id, className } } = req

        deleteStudent(id, className)
            .then(() =>
                res.end()
            )
            .catch(error => {
                const { message } = error

                if (error instanceof NotFoundError)
                    return res.status(404).json({ message })
                if (error instanceof ConflictError)
                    return res.status(409).json({ message })

                res.status(500).json({ message })
            })
    } catch ({ message }) {
        res.status(400).json({ message })
    }
})    

router.get('/student', tokenVerifier, (req, res) => {
    try {
        const { id } = req

        listStudents(id)
            .then(students => res.json(students))
            .catch(error => {
                const { message } = error

                if (error instanceof NotFoundError)
                    return res.status(404).json({ message })

                res.status(500).json({ message })
            })
    } catch ({ message }) {
        res.status(400).json({ message })
    }
})

module.exports = router





