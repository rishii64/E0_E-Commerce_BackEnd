const express = require('express')
const app = express()
const store = require('./Store/Store')
const cors = require('cors')
const route = require('./Routes/UserRouter')
const {connection} = require('./Config/config')

require('dotenv').config()
const port = process.env.PORT

app.use(cors({
    origin: "*"
}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(route)
app.get('/', (req, res) => {
    return res.send(store)
})
app.get('/products/:productData', (req, res) => {
    let category = req.params.productData
    let data = store.filter(data => data.category === `${category}`)
    return res.send(data)
})
app.get('/product/:category/:id', (req, res) => {
    const { id } = req.params
    let data = store.filter(data => data.id === Number(id))
    return res.send(data)
})
app.listen(port, (req, res) => {
    try {
        console.log('server is running fine');
        // connection()
    }
    catch (err) {
        console.error('Error:', err)
    }
})
