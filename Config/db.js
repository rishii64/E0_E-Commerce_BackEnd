const mongoose = require('mongoose')
require('dotenv').config()
const password = process.env.PASSWORD
const clientCloudDB = `mongodb+srv://rishii64:${password}@cluster0.is1j1tg.mongodb.net/uShop?retryWrites=true&w=majority`

const connection = async() => {
    try {
        await mongoose.connect(clientCloudDB)
        console.log('Connection with DB established..');
    }
    catch (err) {
        console.error('Error:', err)
    }
}

module.exports = { connection, mongoose }
