require('dotenv').config()
const { env: { TEST_DB_URL } } = process
const { expect } = require('chai')
const createStudents = require('.')
const { random } = Math
const { database, models: { User, Classroom } } = require('lambda-data')

describe('logic - list students', () => {
    before(() => database.connect(TEST_DB_URL))

    let id, idClassroom, name, surname, email, password

    beforeEach(async () => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}@mail.com`
        username = `username-${random()}`
        password = `password-${random()}`
        nameClassroom = `Sname-${Math.random()}`

        await Promise.all([User.deleteMany(), Classroom.deleteMany()])

        const user = await User.create ({name: name, surname: surname, email: email, password: password, username: username})
        iduser = user.id
        const classroom = await Classroom.create({user : iduser, name: nameClassroom})
        idClassroom = classroom.id
        
    })

    it('should succeed on correct data', async () => {

        await createStudents( iduser, idClassroom, name, surname, email)

    })

    after(() => Promise.all([User.deleteMany(), Classroom.deleteMany()]).then(database.disconnect))
})