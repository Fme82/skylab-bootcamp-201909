const { validate, errors: { NotFoundError } } = require('lambda-util')
const { ObjectId, models: { User, Classroom } } = require('lambda-data')

module.exports = function (id, className) {
    debugger
    validate.string(id)
    validate.string.notVoid('id', id)
    if (!ObjectId.isValid(id)) throw new ContentError(`${id} is not a valid id`)

    validate.string(className)
    validate.string.notVoid('className', className)

    return (async () => {
        const user = await User.findById(id)

        if (!user) throw new NotFoundError(`user with id ${id} not found`)

        const _class = await Classroom.create({ user: id, className })

        return _class.id
        debugger
    })()
}

