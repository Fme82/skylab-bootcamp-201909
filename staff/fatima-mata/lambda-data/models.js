 const {model} = require('mongoose')
 const { user, subject, classroom, task, exam, note } = require('./schemas')
 
 module.exports = {
 
     User: model('User', user),
     Subject: model('Subject', subject),
     Classroom: model('Classroom', classroom),
     Task: model('Task', task),
     Exam: model('Exam', exam),
     Note: model('Note', note),

  }