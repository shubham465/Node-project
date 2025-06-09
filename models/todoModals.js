const mongoose = require('mongoose')

const TodoSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    task: {
        type: String,   
        required: [true, "Please add the task"]
    } 
},
    {timestamps: true}
)

module.exports = mongoose.model("Todo", TodoSchema)