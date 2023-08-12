const express = require('express');
const router = express.Router();
const { Feedback, Booking } = require('../models');
const yup = require("yup");
const { validateToken } = require('../middlewares/auth');
require('dotenv').config();

router.post('/:id', async (req, res) => {
    const id = req.params.id;
    let data = req.body;
    // Validate request body
    let validationSchema = yup.object().shape({
        feedback: yup.string().trim(),
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
    data.bookingid = id

    const booking = await Booking.findByPk(id);
    if (!booking) {
        return res.status(404).json({ message: 'Booking not found' });
    }

    const rating = await Feedback.create(data);

    res.json(rating);
});

router.get("/:id", async (req, res) => {
    let id = req.params.id;
    let feedback = await Feedback.findByPk(id);
    if (!feedback) {
        res.sendStatus(404);
        return;
    }
    res.json(feedback);
});

router.get("/", async (req, res) => {
    let condition = {};

    let list = await Feedback.findAll({
        where: condition,
        order: [['createdAt', 'DESC']],
        attributes: ['id', 'rate', 'feedback'],
        include: [
            {
                model: Booking,
                as: 'booking',
                attributes: ['licencenumber'],
            },
        ],
    });
    res.json(list);
});

router.delete("/:id", async (req, res) => {
    let id = req.params.id;
    // Check id not found
    let rating = await Feedback.findByPk(id);
    if (!rating) {
        res.sendStatus(404);
        return;
    }

    let num = await Feedback.destroy({
        where: { id: id }
    })
    if (num == 1) {
        res.json({
            message: "Rating was deleted successfully."
        });
    }
    else {
        res.status(400).json({
            message: `Cannot delete rating with id ${id}.`
        });
    }
});

module.exports = router;