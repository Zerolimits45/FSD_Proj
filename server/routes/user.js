const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { User } = require('../models');
const yup = require("yup");
const { sign } = require('jsonwebtoken');
const { validateToken } = require('../middlewares/auth');
require('dotenv').config();

// Register route
router.post('/register', async (req, res) => {
    let data = req.body;

    const regEx = /^[89]{1}\d{7}$/
    // Validate request body
    let validationSchema = yup.object().shape({
        email: yup.string().trim().email().max(50).required(),
        password: yup.string().trim().min(8).max(50).required(),
        name: yup.string().trim().min(5).max(50).required(),
        phone: yup.string().trim().min(8).max(8).matches(regEx, "Phone is Invalid").required(),
    })
    try {
        await validationSchema.validate(data,
            { abortEarly: false, strict: true });
    }
    catch (err) {
        res.status(400).json({ errors: err.errors });
        return;
    }

    // Trim string values
    data.email = data.email.trim();
    data.password = data.password.trim();
    data.name = data.name.trim();
    data.phone = data.phone.trim();

    // Check email
    let emailExists = await User.findOne({
        where: { email: data.email }
    });
    if (emailExists) {
        return res.status(400).json({ message: "Email already exists." });
    }
    // Hash passowrd
    data.password = await bcrypt.hash(data.password, 10);
    // Create user
    const user = await User.create(data);
    res.json(user);
})

router.post("/login", async (req, res) => {
    let data = req.body;

    // Validate request body
    let validationSchema = yup.object().shape({
        email: yup.string().trim().email().max(50).required(),
        password: yup.string().trim().min(8).max(50).required()
    });

    try {
        await validationSchema.validate(data, { abortEarly: false, strict: true });
    } catch (err) {
        res.status(400).json({ errors: err.errors });
        return;
    }

    // Trim string values
    data.email = data.email.trim();
    data.password = data.password.trim();

    // Check email and password
    let user = await User.findOne({ where: { email: data.email } });
    if (!user) {
        res.status(400).json({ message: "Email or password is incorrect" });
        return;
    }
    let match = await bcrypt.compare(data.password, user.password);
    if (!match) {
        res.status(400).json({ message: "Email or password is incorrect" });
        return;
    }

    // Return user info
    let userInfo = {
        id: user.id,
        email: user.email,
        password: user.password,
        name: user.name,
        phone: user.phone
    };
    let accessToken = sign(userInfo, process.env.APP_SECRET);
    res.json({
        accessToken: accessToken,
        user: userInfo
    });
});


router.get("/auth", validateToken, (req, res) => {
    let userInfo = {
        id: req.user.id,
        email: req.user.email,
        password: req.user.password,
        name: req.user.name,
        phone: req.user.phone
    };
    res.json({
        user: userInfo
    });
});

module.exports = router;