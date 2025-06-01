const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please add the User name"]
    },
    email: {
        type: String,
        required: [true, "Please add the Email address"]
    },
    password: {
        type: String,
        required: [true, "Please add the User Password"]
    }
    },
    {timestamps: true}
)

module.exports = mongoose.model("User", userSchema)