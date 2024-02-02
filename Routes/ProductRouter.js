const route = require('express').Router()
const products = require('../Store/Store')
const productCollection = require('../Model/ProductModel')

route.get('/', async (req, res) => {
    const totalProducts = await productCollection.find()
    return res.send(totalProducts)
})

route.get('/product/:id', async (req, res) => {
    const productId = request.params.id
    const filterData = await productCollection.find({ id: Number(productId) })
    return res.send(filterData)
})

route.get("/search/:searchedProd", async (request, response) => {
    const searchProd = request.params.searchedProd;
    let filterProductData = products.filter((item) => item.title.toLowerCase().includes(searchProd.toLowerCase()) || item.category.toLowerCase() === searchProd.toLowerCase() || item.category.toLowerCase().includes(searchProd.toLowerCase()) || item.brand.toLowerCase() === searchProd.toLowerCase());
    return response.send(filterProductData);
});

module.exports = route
