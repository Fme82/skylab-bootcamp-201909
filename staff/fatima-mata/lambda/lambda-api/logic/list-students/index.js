const { validate, errors: { NotFoundError, ContentError } } = require('lambda-util')
const { ObjectId, models: { User, Student, Classroom } } = require('lambda-data')

module.exports = function (id, className, name, surname, email) {
    validate.string(id)
    validate.string.notVoid('id', id)
    if (!ObjectId.isValid(id)) throw new ContentError(`${id} is not a valid id`)
    validate.string(name)
    validate.string.notVoid('name', name)
    validate.string(surname)
    validate.string.notVoid(surname, 'surname')
    validate.string(email)
    validate.string.notVoid(email, 'email')
    validate.string(className)
    validate.string.notVoid(className, 'className')

    return (async () => {
        const student = await student.findOne({name})
        
        if(!student) throw Error(`student with name ${name} do not exists`)

        const class2 = await Classroom.findOne({name: className})

        if(!class2) throw Error(`class with id ${id} do not exits`)

        const exist = class2.student.includes(student.id);

        if(exist) throw Error(`student with id ${student.id} already exist`)

        class2.student.push(student)
        
        await class2.save()
    })()
}



