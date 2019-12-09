const { validate, errors: { NotFoundError, ContentError } } = require('lambda-util')
const { ObjectId, models: { User, Classroom } } = require('lambda-data')

module.exports = function (id) {
    validate.string(id)
    validate.string.notVoid('id', id)
    if (!ObjectId.isValid(id)) throw new ContentError(`${id} is not a valid id`)

    return (async () => {
        const user = await User.findById(id)

        if (!user) throw new NotFoundError(`user with id ${id} not found`)

        await Classroom.updateMany({ user: id })

        const classes = await Classroom.find({ user: id }, { __v: 0 }).lean()

        classes.forEach(_class => {
            _class.id = _class._id.toString()
            delete _class._id

            _class.user = id
        })

        return classes
    })()
}
