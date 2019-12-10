const { validate, errors: { ContentError } } = require('lambda-util')
const { ObjectId, models: {  Info, Classroom } } = require('lambda-data')

module.exports = function (id, idClassroom, title, description) {
    validate.string(id)
    validate.string.notVoid('id', id)
    if (!ObjectId.isValid(id)) throw new ContentError(`${id} is not a valid id`)
    validate.string(idClassroom)
    validate.string.notVoid('idClassroom', idClassroom)
    if (!ObjectId.isValid(id)) throw new ContentError(`${idClassroom} is not a valid id`)
    validate.string(title)
    validate.string.notVoid('title', title)
    validate.string(description)
    validate.string.notVoid('description', 'description')

    
    return (async () => {
        const classroom = await Classroom.findById(idClassroom)

        if(!classroom) throw Error(`class with id ${idClassroom} do not exits`)

        const exist = classroom.infos.some(info => info.title === title);

        if(exist) throw Error(`student with id ${info.title} already exist`)

        const info = new Info ({ title, description})

        classroom.infos.push(info)
        
        await classroom.save()
    
        let studentName = student.name.concat(' ').concat(student.surname)
        let toStudent = student.email
        let [dateEmail, time] = moment(date).format("YYYY-MM-DD HH:mm:ss").split(' ')

    sendEmail(toStudent, dateEmail, time, studentName)
})()
}
