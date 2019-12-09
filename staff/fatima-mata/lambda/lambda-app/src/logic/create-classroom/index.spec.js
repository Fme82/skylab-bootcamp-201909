const { env: { REACT_APP_TEST_DB_URL: TEST_DB_URL, REACT_APP_TEST_SECRET: TEST_SECRET } } = process
const createClass = require('.')
const { random } = Math
const { database, models: { User, Classroom } } = require('lambda-data')
const jwt = require('jsonwebtoken')
require('../../helpers/jest-matchers')

describe('logic - create class', () => {
    beforeAll(() => database.connect(TEST_DB_URL))

    let teacher, idA, name, token

    beforeEach(async () => {
        name = `class-${random()}`
        teacher = {
            name: `name-${random()}`,
            surname: `surname-${random()}`,
            email: `email-${random()}@mail.com`,
            username: `username-${random()}`,
            password: `password-${random()}`,
            type: 'teacher'
        }

        await Promise.all([User.deleteMany(), Classroom.deleteMany()])

        const teacher1 = await User.create(teacher)
        idA = teacher1.id
        token = jwt.sign({ sub: idA }, TEST_SECRET)

    })

    it('should succeed on correct data', async () => {
        
        await createClass(token, name)

        const _class =  await Classroom.findOne({name})
        
        expect(_class).toBeDefined()
        expect(_class.name).toBe(name)
    })

    afterAll(() => Promise.all([User.deleteMany(), Classroom.deleteMany()]).then(database.disconnect))
})