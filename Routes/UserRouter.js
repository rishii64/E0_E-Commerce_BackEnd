const route = require("express").Router()
const bcrypt = require('bcrypt')
const saltRound = 10
const jwt = require('jsonwebtoken')
const auth = require('../Middleware/Auth')
require('dotenv').config()
const secretkey = process.env.secretKey

const userCollection = require('../Model/UserModel')

route.post('/register', async (req, res) => {
    const data = req.body
    const accnt = await userCollection.findOne({ email: data.email })
    if (accnt)
        return res.send({ msg: 'This email is already in use !!' })
    data.password = bcrypt.hashSync(data.password, saltRound)
    console.log('Hashed Data: ', data);

    const insertData = await userCollection.create(data)
    const token = jwt.sign({ user: data.email }, secretkey)
    res.send({ msg: 'user registered successfully', token: token, insertData: insertData })
})

route.post('/login', async (req, res) => {
    const loginData = req.body
    const checkData = await userCollection.findOne({ email: loginData.email })
    console.log(checkData);
    if (!checkData) {
        return res.send({ msg: 'User not registered' })
    }
    const authen = bcrypt.compareSync(loginData.password, checkData.password)
    if (authen) {
        const token = jwt.sign({ user: loginData.email }, secretkey, { expiresIn: '1d' })
        return res.send({ msg: 'User logged in successfully', token: token, userData: checkData })
    }
    else {
        return res.send({ msg: 'Password is incorrect' })
    }
})

route.get('/cart', auth, (req,res)=>{
    return res.send({msg: 'item added'})
})

module.exports = route
