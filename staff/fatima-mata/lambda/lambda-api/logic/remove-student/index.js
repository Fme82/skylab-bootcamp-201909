const { models: {  Classroom } } = require('lambda-data')
const { validate } = require('lambda-util')

module.exports = function (id, className) {
    validate.string(id, 'id')
    validate.string(className, 'className')
    
        return (async () => {
        
        const _class = await Classroom.findOne({name: className})
        
        const i = _class.students.findIndex(student => student._id.toString()==id)
        
        if(i == -1) throw Error(`student with id: ${id} not found.`)
        
        _class.students.splice(i, 1)
        
        await _class.save()

    })()
}