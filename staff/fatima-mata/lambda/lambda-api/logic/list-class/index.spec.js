require('dotenv').config()
const { env: { TEST_DB_URL } } = process
const { expect } = require('chai')
const listClasses = require('.')
const { random } = Math
const { database, ObjectId, models: { User, Classroom } } = require('lambda-data')

describe('logic - list classes', () => {
    before(() => database.connect(TEST_DB_URL))

    let id, name, surname, email, username, password, classIds, className

    beforeEach(async () => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}@mail.com`
        username = `username-${random()}`
        password = `password-${random()}`

        await Promise.all([User.deleteMany(), Classroom.deleteMany()])

        const user = await User.create({ name, surname, email, username, password })

        id = user.id

        taskIds = []
        classNames = []

        const insertions = []

        for (let i = 0; i < 10; i++) {
            const _class = {
                user: id,
                className: `title-${random()}`,
            }

            insertions.push(Classroom.create(_class).then(_class => classIds.push(_class.id)))

            classNames.push(_class.className)
        }

        for (let i = 0; i < 10; i++)
            insertions.push(Classroom.create({
                user: ObjectId(),
                className: `className-${random()}`,
            }))

        await Promise.all(insertions)
    })

    it('should succeed on correct user and class data', async () => {
        const classes = await listClasses(id)

        expect(classes).to.exist
        expect(classes).to.have.lengthOf(10)

        tasks.forEach(task => {
            expect(_class.id).to.exist
            expect(_class.id).to.be.a('string')
            expect(_class.id).to.have.length.greaterThan(0)
            expect(_class.id).be.oneOf(classIds)

            expect(_class.user).to.equal(id)

            expect(_class.className).to.exist
            expect(_class.className).to.be.a('string')
            expect(_class.className).to.have.length.greaterThan(0)
            expect(_class.className).be.oneOf(titles)

        })
    })

    after(() => Promise.all([User.deleteMany(), Classroom.deleteMany()]).then(database.disconnect))
})
