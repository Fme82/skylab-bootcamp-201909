const { Schema } = require('mongoose')
const Note = require('./note')

module.exports = new Schema({

    title:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        required: true
    },
    notes: [Note]
})