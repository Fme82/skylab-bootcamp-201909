const { validate, errors: { NotFoundError } } = require('lambda-util')
const { ObjectId, models: { User, Classroom } } = require('lambda-data')

module.exports = function (id, name) {
    validate.string(id)
    validate.string.notVoid('id', id)
    if (!ObjectId.isValid(id)) throw new ContentError(`${id} is not a valid id`)

    validate.string(name)
    validate.string.notVoid('name', name)

    return (async () => {
        const user = await User.findById(id)

        if (!user) throw new NotFoundError(`user with id ${id} not found`)

        const classroom = await Classroom.create({ user: id, name })

        return classroom.id
    })()
}

