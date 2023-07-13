const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Simple Route
app.get("/", (req, res) => {
    res.send("Welcome to the learning space.");
});

// authentication for help page
app.get('/help', (req, res) => {
    const isAuthenticated = req.user ? true : false; // Check if the user is authenticated
    res.render('help', { isAuthenticated }); // Render the React component with the authentication status
  });
  

// Routes
const userRoute = require("./routes/user")
app.use("/user", userRoute)

const ratingRoute = require("./routes/rating")
app.use("/profile/rate", ratingRoute)

const helpRoute = require("./routes/help")
app.use("/profile/help", helpRoute)

const carRoute = require("./routes/car")
app.use("/car", carRoute)

const bookingRoute = require("./routes/booking")
app.use("/booking", bookingRoute)

const db = require('./models');
db.sequelize.sync({ alter: true }).then(() => {
    let port = process.env.APP_PORT;
    app.listen(port, () => {
        console.log(`⚡ Server running on http://localhost:${port}`);
    });
});