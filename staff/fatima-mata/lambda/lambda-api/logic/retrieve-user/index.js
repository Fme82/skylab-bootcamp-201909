const { validate, errors: { NotFoundError, ContentError } } = require('lambda-util')
const { ObjectId, models: { User } } = require('lambda-data')

module.exports = function (id) {
    validate.string(id)
    validate.string.notVoid('id', id)
    if (!ObjectId.isValid(id)) throw new ContentError(`${id} is not a valid id`)

    return (async () => {
        const user = await User.findById(id)

        if (!user) throw new NotFoundError(`user with id ${id} not found`)

        await user.save()

        const { name, surname, email, username, type } = user.toObject()

        return { id, name, surname, email, username }
    })()
}