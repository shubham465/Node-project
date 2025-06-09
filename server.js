const express = require("express");
const ErrorHandler = require("./controllers/middleware/ErrorHandler");
const dotenv = require("dotenv").config();
const connectDb = require('./configs/dbConnection')
const cors  = require('cors');

const app = express();
const port = process.env.PORT || 5000;

connectDb()
app.use(cors());
app.use(express.json());
app.use('/api/todos', require('./Routes/todoRoutes'))
app.use('/api/user', require('./Routes/userRoutes'))
app.get("/", (req, res) => res.send("Express on Vercel"));
app.use(ErrorHandler)

app.listen(port, ()=> {
    console.log(`App is running on port : ${port}`)
})