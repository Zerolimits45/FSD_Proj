const express = require('express');
const router = express.Router();
const { Feedback } = require('../models');
const yup = require("yup");
const { validateToken } = require('../middlewares/auth');
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
});

router.get("/:id", async (req, res) => {
    let id = req.params.id;
    let help = await Help.findByPk(id);
    if (!help) {
        res.sendStatus(404);
        return;
    }
    res.json(help);
});

router.get("/", async (req, res) => {
    let condition = {};
    let search = req.query.search;
    if (search) {
        condition[Sequelize.Op.or] = [
            { rate: { [Sequelize.Op.like]: `%${search}%` } },
        ];
    }

    let list = await Feedback.findAll({
        where: condition,
        order: [['createdAt', 'DESC']],
        include: { model: User, as: "user", attributes: ['name'] }
    });
    res.json(list);
});

router.delete("/:id", validateToken, async (req, res) => {
    let id = req.params.id;
    // Check id not found
    let rating = await Feedback.findByPk(id);
    if (!rating) {
        res.sendStatus(404);
        return;
    }

    // Check request user id
    let userId = req.user.id;
    if (rating.userId != userId) {
        res.sendStatus(403);
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