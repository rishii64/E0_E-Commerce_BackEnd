const { MongoClient } = require('mongodb')
require('dotenv').config()
const password = process.env.PASSWORD
const clientCloudDB = new MongoClient(`mongodb+srv://rishii64:${password}@cluster0.is1j1tg.mongodb.net/?retryWrites=true&w=majority`)

const connection = async() => {
    try {
        await clientCloudDB.connect()
        console.log('Connection with DB established..');
    }
    catch (err) {
        console.error('Error:', err)
    }
}
const databaseName = clientCloudDB.db('uShop')
module.exports = { connection, databaseName }
