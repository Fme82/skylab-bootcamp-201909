const { Schema, ObjectId } = require('mongoose')
const Student = require('./student')
const Info = require('./info')

module.exports = new Schema({
    user: {
        type: ObjectId,
        required: true,
        ref: 'User'
    },
    name: {
        type: String,
        required: true
    },
    students: [Student],
    infos: [Info]
})

