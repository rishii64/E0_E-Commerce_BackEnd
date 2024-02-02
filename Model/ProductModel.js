const { mongoose } = require('../Config/db')

const productSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true
    }
})
const productCollection = mongoose.model('Products', productSchema)
module.exports = productCollection
