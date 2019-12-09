/*require('dotenv').config()
const { env: { TEST_DB_URL } } = process
const { expect } = require('chai')
const deleteStudent = require('.')
const { random } = Math
const { database, models: { User, Classroom } } = require('lambda-data')

describe('logic - delete student', () => {
    before(() => database.connect(TEST_DB_URL))

    let student1, name, student2, students, teacher

    beforeEach(async () => {
        name = `class-${random()}`
        student1 = {
            name: `name-${random()}`,
            surname: `surname-${random()}`,
            email: `email-${random()}@mail.com`,
            username: `username-${random()}`,
            password: `password-${random()}`,
            type: 'student'
        }
        student2 = {
            name: `name-${random()}`,
            surname: `surname-${random()}`,
            email: `email-${random()}@mail.com`,
            username: `username-${random()}`,
            password: `password-${random()}`,
            type: 'student'
        }
        
        teacher = {
            name: `teacher-${random()}`,
            surname: `surname-${random()}`,
            email: `email-${random()}@mail.com`,
            username: `username-${random()}`,
            password: `password-${random()}`,
            type: 'teacher'
        }

        await Promise.all([User.deleteMany(), Classroom.deleteMany()])
        
        const student11 = await User.create(student1)
        idS11 = student11.id
        const student22 = await User.create(student2)
        idS22 = student22.id
        const teacher1 = await User.create(teacher)
        idA = teacher1.id

        students = [idS11, idS22]

        await Classroom.create({name, teacher1, students})
    })

    it('should succeed on correct data', async () => {
        
        await deleteStudent(idS11, name)

        const _class =  await Classroom.findOne({name})

        expect(_class.students.length).to.equal(1)

    })

    after(() => database.disconnect())
})*/