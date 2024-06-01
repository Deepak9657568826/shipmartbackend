const mongoose = require("mongoose")

const userSchema =  mongoose.Schema({
    name:String, 
    email:String, 
    password:String, 
    role:{
        type:String, 
        enum:["customer", "buyer" , "seller"], 
        default:"customer"
    }
})

const UserModel = mongoose.model("users", userSchema)

module.exports= {
    UserModel
}