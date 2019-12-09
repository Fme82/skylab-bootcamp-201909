const call = require('../../utils/call')
const { validate, errors: { NotFoundError, CredentialsError, ContentError } } = require('lambda-util')
const API_URL = process.env.REACT_APP_API_URL

module.exports = function (token, className) {
    validate.string(token)
    validate.string.notVoid('token', token)

    validate.string(className)
    validate.string.notVoid('className', className)

    return (async () => {
        const res = await call(`${API_URL}/classes`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ className })
        })

        if (res.status === 201) return

        if (res.status === 400) throw new ContentError(JSON.parse(res.body).message)
        
        if (res.status === 401) throw new CredentialsError(JSON.parse(res.body).message)
        
        if (res.status === 404) throw new NotFoundError(JSON.parse(res.body).message)

        throw new Error(JSON.parse(res.body).message)
    })()
}






