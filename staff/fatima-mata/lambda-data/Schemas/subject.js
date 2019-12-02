const { Schema, ObjectId } = require('mongoose')
const Exam = require('./exam')
const Task = require('./task')

module.exports = new Schema({
    name: {
        type: String,
        required: true
    },
    students: [
        {type: ObjectId, ref: 'User'}
    ],
    teachers: [
        {type: ObjectId, ref: 'User'}
    ],
    exams: [Exam],
    task: [Task]
})