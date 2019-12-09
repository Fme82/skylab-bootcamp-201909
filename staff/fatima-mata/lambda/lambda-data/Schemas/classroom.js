const { Schema, ObjectId } = require('mongoose')
const Student = require('./student')
const Task = require('./task')

 module.exports = new Schema({
    user: {
        type: ObjectId,
        required: true,
        ref: 'User'
    },
     className: {
         type:String,
         required:true
     },
     
     student: [ Student ],
     task: [Task]
 })

