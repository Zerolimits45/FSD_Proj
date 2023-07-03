const express = require('express');
const router = express.Router();
const { Feedback } = require('../models');
const yup = require("yup");
require('dotenv').config();

router.post('/', async (req, res) => {
    let data = req.body;
    // Validate request body
    let validationSchema = yup.object().shape({
        feedback: yup.string().trim().min().max(),
        rate: yup.number().min(1).max(5).integer('Value must be an integer'),

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
    data.feedback = data.feedback.trim();
    // Create user
    const rating = await Feedback.create(data);
    res.json(rating);
})