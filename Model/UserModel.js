const {mongoose} = require('../Config/db')

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
})

const userCollection = mongoose.model('User',userSchema)
module.exports = userCollection;