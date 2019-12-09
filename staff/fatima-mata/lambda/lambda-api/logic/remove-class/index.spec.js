require('dotenv').config()
const { env: { TEST_DB_URL } } = process
const { expect } = require('chai')
const deleteClass = require('.')
const { random } = Math
const { errors: { NotFoundError, ConflictError }, polyfills: { arrayRandom } } = require('lambda-util')
const { database, ObjectId, models: { User, Classroom } } = require('lambda-data')

arrayRandom()

describe('logic - delete class', () => {
    before(() => database.connect(TEST_DB_URL))

    let id, name, surname, email, username, password, className 

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

        classIds = []
        className = []

        const insertions = []

        for (let i = 0; i < 10; i++) {
            const _class = {
                user: id,
                className: `className-${random()}`,
            }

            insertions.push(Classroom.create(_class)
                .then(_class => classIds.push(_class.id)))

            className.push(_class.className)
        }

        for (let i = 0; i < 10; i++)
            insertions.push(Classroom.create({
                user: ObjectId(),
                className: `className-${random()}`,
            
            }))

        await Promise.all(insertions)
    })

    it('should succeed on correct user and class data', async () => {
        const classId = classIds.random()

        const response = await deleteClass(id, classId)

        expect(response).to.not.exist

        const _class = await Classroom.findById(classId)

        expect(_class).to.not.exist
    })

    it('should fail on unexisting user and correct class data', async () => {
        const id = ObjectId().toString()
        const classId = classIds.random()

        try {
            await deleteClass(id, classId)

            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.exist
            expect(error).to.be.an.instanceOf(NotFoundError)
            expect(error.message).to.equal(`user with id ${id} not found`)
        }
    })

    it('should fail on correct user and unexisting class data', async () => {
        const classId = ObjectId().toString()

        try {
            await deleteClass(id, classId)

            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.exist
            expect(error).to.be.an.instanceOf(NotFoundError)
            expect(error.message).to.equal(`user does not have task with id ${classId}`)
        }
    })

    it('should fail on correct user and wrong class data', async () => {
        const { _id } = await Classroom.findOne({ _id: { $nin: classIds.map(classId => ObjectId(classId)) } })

        const classId = _id.toString()

        try {
            await deleteClass(id, classId)

            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.exist
            expect(error).to.be.an.instanceOf(ConflictError)
            expect(error.message).to.equal(`user with id ${id} does not correspond to task with id ${classId}`)
        }
    })


    after(() => Promise.all([User.deleteMany(), Classroom.deleteMany()]).then(database.disconnect))
})
