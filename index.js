const express = require('express')
const app = express()
const store = require('./Store/Store')
const cors = require('cors')

app.use(cors({
    origin:"*"
}))
app.get('/products/:productData',(req,res)=>{
    let category = req.params.productData
    let data = store.filter(data=> data.category === `${category}`)
    return res.send(data)
})
app.get('/product/:category/:id',(req,res)=>{
    const {id} = req.params
    let data = store.filter(data=> data.id === Number(id))
    return res.send(data)
})
app.listen(4000,(req,res)=>{
    try{
        console.log('server is running fine');
    }
    catch(err){
        console.error('Error:',err)
    }
})
