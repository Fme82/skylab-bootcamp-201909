const { Schema } = require('mongoose')
const { validators: { isEmail } } = require('lambda-util')

module.exports =  new Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate: isEmail
    },
})