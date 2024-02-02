const { mongoose } = require('../Config/db')

const userSchema = mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

const userCollection = mongoose.model('Test_User', userSchema)
module.exports = userCollection;
