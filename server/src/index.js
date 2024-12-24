const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");

//database connection
const dbConnect = require("./config/dbConnect");


const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

dbConnect();

const app = express();

//Middleware
app.use(express.json()); //enable parsing of json
app.use(cors()); //enable CORS, handle request from diff origin (eg handle request from frontend)

//Routes
app.use("/api/auth", authRoutes); //handling authentication, request to /api/auth send to authRoutes
app.use("/api/users", userRoutes); //handling users, users is the API endpoints

app.get('/',(req,res)=>{
    res.send('test')
})

//Start the server
const PORT = process.env.PORT || 8081;
app.listen(PORT, ()=> {
    console.log(`Server is running at port ${PORT}`);
})