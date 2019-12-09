const { validate, errors: { ContentError } } = require('lambda-util')
const { ObjectId, models: { Student, Classroom } } = require('lambda-data')

module.exports = function (id, idClassroom, name, surname, email) {
    validate.string(id)
    validate.string.notVoid('id', id)
    if (!ObjectId.isValid(id)) throw new ContentError(`${id} is not a valid id`)
    validate.string(idClassroom)
    validate.string.notVoid('idClassroom', idClassroom)
    if (!ObjectId.isValid(id)) throw new ContentError(`${idClassroom} is not a valid id`)
    validate.string(name)
    validate.string.notVoid('name', name)
    validate.string(surname)
    validate.string.notVoid(surname, 'surname')
    validate.string(email)
    validate.string.notVoid(email, 'email')

    
    return (async () => {
        const classroom = await Classroom.findById(idClassroom)

        if(!classroom) throw Error(`class with id ${idClassroom} do not exits`)

        const exist = classroom.students.some(student => student.email === email);

        if(exist) throw Error(`student with id ${student.email} already exist`)

        const student = new Student ({ name, surname, email})

        classroom.students.push(student)
        
        await classroom.save()
    })()
}



