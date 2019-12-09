require('dotenv').config()
const { env: { TEST_DB_URL } } = process
const { expect } = require('chai')
const listClassrooms = require('.')
const { random } = Math
const { database, ObjectId, models: { User, Classroom } } = require('lambda-data')

describe('logic - list classrooms', () => {
    before(() => database.connect(TEST_DB_URL))

    let id, name, surname, email, username, password, classroomIds, classroomNames

    beforeEach(async () => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}@mail.com`
        username = `username-${random()}`
        password = `password-${random()}`

        await Promise.all([User.deleteMany(), Classroom.deleteMany()])

        const user = await User.create({ name, surname, email, username, password })

        id = user.id

        const insertions = []
        classroomIds = []
        classroomNames = []

        for (let i = 0; i < 10; i++) {
            const classroom = {
                user: id,
                name: `name-${random()}`,
            }

            insertions.push(Classroom.create(classroom).then(classroom => {
                classroomIds.push(classroom.id)
                classroomNames.push(classroom.name)
            }))
        }

        for (let i = 0; i < 10; i++)
            insertions.push(Classroom.create({
                user: ObjectId(),
                name: `name-${random()}`,
            }))

        await Promise.all(insertions)
    })

    it('should succeed on correct user and class data', async () => {
        const classrooms = await listClassrooms(id)

        expect(classrooms).to.exist
        expect(classrooms).to.have.lengthOf(10)

        classrooms.forEach(classroom => {
            expect(classroom.id).to.exist
            expect(classroom.id).to.be.a('string')
            expect(classroom.id).to.have.length.greaterThan(0)
            expect(classroom.id).be.oneOf(classroomIds)

            expect(classroom.user).to.equal(id)

            expect(classroom.name).to.exist
            expect(classroom.name).to.be.a('string')
            expect(classroom.name).to.have.length.greaterThan(0)
            expect(classroom.name).be.oneOf(classroomNames)

        })
    })

    after(() => Promise.all([User.deleteMany(), Classroom.deleteMany()]).then(database.disconnect))
})
