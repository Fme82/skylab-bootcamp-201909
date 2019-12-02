const { Schema, ObjectId } = require('mongoose')

module.exports =  new Schema({
    user: {
        type: ObjectId,
        required: true,
        ref: 'User'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['INFO', 'HOMEWORK', 'NOTES', 'CLASS'],
        default: 'INFO'
        
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    }
})