const express = require("express");
const ErrorHandler = require("./controllers/middleware/ErrorHandler");
const dotenv = require("dotenv").config();
const connectDb = require('./configs/dbConnection')

const app = express();
const port = process.env.PORT || 5000;

connectDb()
app.use(express.json());
app.use('/api/contacts', require('./Routes/ContactRoutes'))
app.use('/api/user', require('./Routes/userRoutes'))
app.use(ErrorHandler)

app.listen(port, ()=> {
    console.log(`App is running on port : ${port}`)
})