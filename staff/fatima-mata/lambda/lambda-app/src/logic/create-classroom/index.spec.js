const { env: { REACT_APP_TEST_DB_URL: TEST_DB_URL, REACT_APP_TEST_SECRET: TEST_SECRET } } = process
const createClassroom = require('.')
const { random } = Math
const { database, models: { User, Task } } = require('lambda-data')
const jwt = require('jsonwebtoken')
require('../../helpers/jest-matchers')

describe('logic - create classroom', () => {
    beforeAll(() => database.connect(TEST_DB_URL))

    let id, token, name, surname, email, username, password, className

    beforeEach(async () => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}@mail.com`
        username = `username-${random()}`
        password = `password-${random()}`

        await Promise.all([User.deleteMany(), Task.deleteMany()])

        const user = await User.create({ name, surname, email, username, password })

        id = user.id
        token = jwt.sign({ sub: id }, TEST_SECRET)

        className = `className-${random()}`
    })

    it('should succeed on correct user and task data', async () => {
        const classroomId = await createClassroom(token, className)

        expect(classroomId).toBeDefined()
        expect(classroomId).toBeOfType('string')
        expect(classroomId).toHaveLengthGreaterThan(0)

        const classroom = await Task.findById(taskId)

        expect(classroom).toBeDefined()
        expect(classroom.user.toString()).toBe(id)
        expect(classroom.name).toBe(name)
    })


    afterAll(() => Promise.all([User.deleteMany(), Task.deleteMany()]).then(database.disconnect))
})