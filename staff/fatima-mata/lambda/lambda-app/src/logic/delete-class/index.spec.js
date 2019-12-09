const { env: { REACT_APP_TEST_DB_URL: TEST_DB_URL, REACT_APP_TEST_SECRET: TEST_SECRET } } = process
const deleteClass = require('.')
const { random } = Math
const { errors: { NotFoundError, ConflictError }, polyfills: { arrayRandom } } = require('lambda-util')
const { database, ObjectId, models: { User, Classroom } } = require('lambda-data')
const jwt = require('jsonwebtoken')
require('../../helpers/jest-matchers')

arrayRandom()

describe('logic - delete class', () => {
    beforeAll(() => database.connect(TEST_DB_URL))

    let  teacher1, teacher, idA, name

    beforeEach(async () => {
        name = `class-${random()}`
        teacher1 = {
            name: `name-${random()}`,
            surname: `surname-${random()}`,
            email: `email-${random()}@mail.com`,
            username: `username-${random()}`,
            password: `password-${random()}`,
            type: 'teacher'
        }
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
        const teacher = await User.create(teacher1)
        //teacherId = teacher.id
    
        //await Classroom.create({ name, teachers: teacherId})
        
    })

    it('should succeed on correct data', async () => {
        
        await deleteClass(idA, name)

        const _class =  await Classroom.findOne({name})

        expect(_class).toBeUndefined

    })

    afterAll(() => Promise.all([User.deleteMany(), Classroom.deleteMany()]).then(database.disconnect))
})