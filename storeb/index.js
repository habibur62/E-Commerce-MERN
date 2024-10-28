const express = require('express')
const cors = require('cors');
require('dotenv').config()
const connectDB = require('./config/db')



const router = require('./routers')
const app = express()
app.use(cors({
    origin: 'http://localhost:5173', // Your frontend URL
    credentials: true,               // Allow credentials (cookies)
}));
app.use(express.json({ limit: '10mb' })); // Set to 10MB or any other appropriate size
app.use(express.urlencoded({ limit: '10mb', extended: true })); 

const PORT = 8000 || process.env.PORT
app.use(express.json())
const cookieParser = require('cookie-parser')


app.use(cookieParser())
app.use("/api", router)

connectDB().then(()=>{
    app.listen(PORT, ()=>{
        console.log("Server is running");
    })
})