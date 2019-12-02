const { Schema, ObjectId } = require('mongoose')

module.exports = new Schema({

    student:{
        type: ObjectId,
        ref: 'User'
    },
    name:{
        type: String
    },
    surname:{
        type: String
    },
    note:{
        type: Number,  
    }
})