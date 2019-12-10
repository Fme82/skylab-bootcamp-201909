const { model } = require('mongoose')
const { user, classroom, info, student } = require('./_schemas')

module.exports = {

    User: model('User', user),
    Classroom: model('Classroom', classroom),
    Info: model('Info', info),
    Student: model('Student', student)

}