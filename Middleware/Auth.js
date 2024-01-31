const jwt = require('jsonwebtoken')
require('dotenv').config()
const secretkey = process.env.secretKey

const auth = (req, res, next) => {
    const data = req.headers['authorization']
    console.log('Token:', data);
    const token = data.split(' ')[1]
    if (token) {
        jwt.verify(token, secretkey, (err, validate) => {
            if (err)
                return res.send('Error while accessing', err)
            if (validate)
                return next()
            return res.send('user is not authorised')
        })
    }
    else
        return res.send({ msg: 'Email id is not registered' })
}

module.exports = auth
