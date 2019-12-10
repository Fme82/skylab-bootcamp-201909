const { Router } = require('express')
const { createClassroom, createStudent, listClassrooms, createInfo } = require('../../logic')
const jwt = require('jsonwebtoken')
const { env: { SECRET } } = process
const tokenVerifier = require('../../helpers/token-verifier')(SECRET)
const bodyParser = require('body-parser')
const { errors: { NotFoundError, ConflictError } } = require('lambda-util')

const jsonBodyParser = bodyParser.json()

const router = Router()

router.post('/', tokenVerifier, jsonBodyParser, (req, res) => {
    const { id, body: { name } } = req

    try {
        createClassroom(id, name)
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

router.get('/', tokenVerifier, (req, res) => {
    try {
        const { id } = req

        listClassrooms(id)
            .then(classrooms => res.json(classrooms))
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

router.post('/student/:idClassroom', tokenVerifier, jsonBodyParser, (req, res) => {
    const { id, params: {idClassroom}, body: { name, surname, email } } = req

    try {
        createStudent(id, idClassroom, name, surname, email)
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

router.post('/info/:idClassroom', tokenVerifier, jsonBodyParser, (req, res) => {
    const { id, params: {idClassroom}, body: { title, description } } = req

    try {
        createInfo(id, idClassroom, title, description)
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

module.exports = router





