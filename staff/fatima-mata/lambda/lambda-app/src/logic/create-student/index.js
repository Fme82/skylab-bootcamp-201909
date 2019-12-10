const call = require('../../utils/call')
const { validate, errors: { NotFoundError, CredentialsError, ContentError } } = require('lambda-util')
const API_URL = process.env.REACT_APP_API_URL

module.exports = function (token, idClassroom, name, surname, email) {
    validate.string(token)
    validate.string.notVoid('token', token)

    validate.string(idClassroom)
    validate.string.notVoid('idClassroom', idClassroom)

    validate.string(name)
    validate.string.notVoid('name', name)

    validate.string(surname)
    validate.string.notVoid('surname', surname)

    validate.string(email)
    validate.string.notVoid('email', email)

    return (async () => {
        const res = await call(`${API_URL}/classrooms/student/${idClassroom}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, surname, email })
        })

        if (res.status === 201) return

        if (res.status === 400) throw new ContentError(JSON.parse(res.body).message)
        
        if (res.status === 401) throw new CredentialsError(JSON.parse(res.body).message)
        
        if (res.status === 404) throw new NotFoundError(JSON.parse(res.body).message)

        throw new Error(JSON.parse(res.body).message)
    })()
}



