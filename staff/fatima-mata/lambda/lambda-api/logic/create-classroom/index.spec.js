require('dotenv').config()
const { env: { TEST_DB_URL } } = process
const { expect } = require('chai')
const createClassroom = require('.')
const { random } = Math
const { database, models: { User, Classroom } } = require('lambda-data')

describe('logic - create classroom', () => {
    before(() => database.connect(TEST_DB_URL))

    let id, name, surname, email, username, password, className

    beforeEach(async () => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}@mail.com`
        username = `username-${random()}`
        password = `password-${random()}`

        await Promise.all([User.deleteMany(), Classroom.deleteMany()])

        const user = await User.create({ name, surname, email, username, password })

        id = user.id

        className = `name-${random()}`
    })

    it('should succeed on correct user and class data', async () => {
        const classroomId = await createClassroom(id, className)

        expect(classroomId).to.exist
        expect(classroomId).to.be.a('string')
        expect(classroomId).to.have.length.greaterThan(0)

        const classroom = await Classroom.findById(classroomId)

        expect(classroom).to.exist
        expect(classroom.user.toString()).to.equal(id)
        expect(classroom.name).to.equal(className)
    })

    after(() => Promise.all([User.deleteMany(), Classroom.deleteMany()]).then(database.disconnect))
})
