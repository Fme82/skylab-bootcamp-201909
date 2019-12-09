const { validate, errors: { NotFoundError, ConflictError, ContentError } } = require('lambda-util')
const { ObjectId, models: { User, Classroom } } = require('lambda-data')

module.exports = function (id, classId) {
    validate.string(id)
    validate.string.notVoid('id', id)
    if (!ObjectId.isValid(id)) throw new ContentError(`${id} is not a valid id`)

    validate.string(classId)
    validate.string.notVoid('classId', classId)
    if (!ObjectId.isValid(classId)) throw new ContentError(`${classId} is not a valid class id`)

    return (async () => {
        const user = await User.findById(id)

        if (!user) throw new NotFoundError(`user with id ${id} not found`)

        const _class = await Classroom.findById(classId)

        if (!_class) throw new NotFoundError(`user does not have task with id ${classId}`)

        if (_class.user.toString() !== id.toString()) throw new ConflictError(`user with id ${id} does not correspond to task with id ${classId}`)

        await Classroom.deleteOne({ _id: ObjectId(classId) })
    })()
}
