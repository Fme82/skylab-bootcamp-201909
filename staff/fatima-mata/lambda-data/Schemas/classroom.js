const { Schema, ObjectId } = require('mongoose')

 module.exports = new Schema({
     name: {
         type:String,
         required:true
     },
     admin: { type: ObjectId, ref: 'User'},
     teachers: [ { type: ObjectId, ref: 'User', required: true} ],
     students: [ { type: ObjectId, ref: 'User' } ]
 })

