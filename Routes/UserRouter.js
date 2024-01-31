const express = require("express")
const route = express.Router()
const bcrypt = require('bcrypt')
const saltRound = 10
const jwt = require('jsonwebtoken')
const secretkey = 'sm'
const auth = require('../Middleware/Auth')

const { databaseName } = require('../config/config')
const userCollection = databaseName.collection('test_user')

route.post('/register', async (req, res) => {
    const data = req.body 

    const accnt = await userCollection.findOne({ email: data.email })
    if (accnt)
        return res.send({ msg: 'This email is already in use !!' })
    data.password = bcrypt.hashSync(data.password, saltRound)   
    console.log('Hashed Data: ', data);


    const insertData = await userCollection.insertOne(data)   
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
        return res.send({ msg: 'User logged in successfully', token: token })
    }
    else {
        return res.send({ msg: 'Password is incorrect' })
    }
})

route.get('/home', (req, res) => {
    res.send({ msg: 'Welcome to Home Page' })
})

route.get('/dashboard', auth, (req, res) => {
    res.send({ msg: 'Welcome to dashboard' })
})

module.exports = route
