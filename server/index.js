const express = require('express');
const router = express.Router();
const cors = require('cors');
const session = require('express-session')
require('dotenv').config();

const app = express();
app.use(session({
  secret: process.env.APP_SECRET,
  resave: false,
  saveUninitialized: false,
}))

// Set up CORS with the allowed origin of your client's domain
const allowedOrigins = ['http://localhost:5173', '<ngrok address>']; // Replace with your client's domain
const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Allow cookies to be included with requests
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

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

const fileRoute = require('./routes/file');
app.use("/file", fileRoute);

const ratingRoute = require("./routes/rating")
app.use("/profile/rate", ratingRoute)

const helpRoute = require("./routes/help")
app.use("/profile/help", helpRoute)

const carRoute = require("./routes/car")
app.use("/car", carRoute)

const bookingRoute = require("./routes/booking")
app.use("/booking", bookingRoute)

const discussionRoute = require("./routes/discussion")
app.use("/discussion", discussionRoute)

const stripeRoute = require("./routes/stripe")
app.use("/stripe", stripeRoute)

const requestRoute = require("./routes/request")
app.use("/request", requestRoute)

const db = require('./models');
db.sequelize.sync({ alter: true }).then(() => {
  let port = process.env.APP_PORT;
  app.listen(port, () => {
    console.log(`⚡ Server running on http://localhost:${port}`);
  });
});