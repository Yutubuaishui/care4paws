const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");

//database connection
const dbConnect = require("./config/dbConnect");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const communityPostRoutes = require("./routes/communityPostRoutes");
const educationPostRoutes = require("./routes/EducationPostRoutes");
const donationRoutes = require("./routes/DonationRoutes");
const coordinatorDonation = require("./routes/CoordinatorDonationRoutes");

dbConnect();

const app = express();

//Middleware
app.use(express.json()); //enable parsing of json
app.use(
  cors({
    origin: "http://localhost:3000", // Allow requests from frontend
    methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed methods
    credentials: true, // Allow cookies if needed
  })
); //enable CORS, handle request from diff origin (eg handle request from frontend)

//Routes
app.use("/api/auth", authRoutes); //handling authentication, request to /api/auth send to authRoutes
app.use("/api/users", userRoutes); //handling users, users is the API endpoints
app.use("/api/communityPost", communityPostRoutes); //handling community module
app.use("/api/educationPost", educationPostRoutes); // Use the new route for education posts
app.use("/api/donation", donationRoutes);
app.use("/api/coordinatorDonation", coordinatorDonation);

app.get("/", (req, res) => {
  res.send("Welcome to Care4Paws");
});

//Start the server
const PORT = process.env.PORT || 8082;
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
