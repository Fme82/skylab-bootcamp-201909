const { validate, errors: { NotFoundError, ContentError } } = require('lambda-util')
const { ObjectId, models: { User, Classroom } } = require('lambda-data')

module.exports = function (id) {
    validate.string(id)
    validate.string.notVoid('id', id)
    if (!ObjectId.isValid(id)) throw new ContentError(`${id} is not a valid id`)

    return (async () => {
        const user = await User.findById(id)

        if (!user) throw new NotFoundError(`user with id ${id} not found`)

        const classrooms = await Classroom.find({ user: ObjectId(id) }, { __v: 0 }).lean()

        classrooms.forEach(classroom => {
            classroom.id = classroom._id.toString()

            delete classroom._id

            classroom.user = id
        })

        return classrooms
    })()
}
