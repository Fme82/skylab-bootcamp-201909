require('dotenv').config()
const { env: { TEST_DB_URL } } = process
const { expect } = require('chai')
const createClass = require('.')
const { random } = Math
const { database, models: { User, Classroom } } = require('lambda-data')

describe('logic - create class', () => {
    before(() => database.connect(TEST_DB_URL))

    let id, name, surname, email, username, password, type, className

    beforeEach(async () => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}@mail.com`
        username = `username-${random()}`
        password = `password-${random()}`
        type = 'teacher'

        await Promise.all([User.deleteMany(), Classroom.deleteMany()])

        const user = await User.create({ name, surname, email, username, password, type })

        id = user.id

        className = `className-${random()}`
    })

    it('should succeed on correct user and class data', async () => {
        const classId = await createClass(id, className)

        expect(classId).to.exist
        expect(classId).to.be.a('string')
        expect(classId).to.have.length.greaterThan(0)

        const _class = await Classroom.findById(classId)

        expect(_class).to.exist
        expect(_class.user.toString()).to.equal(id)
        expect(_class.className).to.equal(className)
    })

    after(() => Promise.all([User.deleteMany(), Classroom.deleteMany()]).then(database.disconnect))
})
