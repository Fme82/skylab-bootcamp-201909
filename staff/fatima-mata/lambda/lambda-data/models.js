 const {model} = require('mongoose')
 const { user, classroom, task, student } = require('./schemas')
 
 module.exports = {
 
     User: model('User', user),
     Classroom: model('Classroom', classroom),
     Task: model('Task', task),
     Student: model('Student', student)

  }