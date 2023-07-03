const express = require('express');
const router = express.Router();
const { Help } = require('../models');
const yup = require("yup");
const { validateToken } = require('../middlewares/auth');
require('dotenv').config();

router.post('/', async (req, res) => {
    let data = req.body;
    const regEx = /^[0-9a-zA-Z]+$/;
    // Validate request body
    let validationSchema = yup.object().shape({
        name: yup.string().trim().min().max().required(),
        reason: yup.string().trim().min().max(),
        email: yup.string().trim().email().required(),
        model: yup.string().trim(),
        make: yup.string().trim(),
        license_no: yup.string().trim().min(9).max(9).matches(regEx, "License Number is Invalid").required(),

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
    data.help = data.help.trim();
    // Create user
    const help = await Help.create(data);
    res.json(rating);
});

router.get("/:id", async (req, res) => {
    let id = req.params.id;
    let help = await Help.findByPk(id);
    res.json(tutorial);
    if (!help) {
        res.sendStatus(404);
        return;
    }
});

router.get("/", async (req, res) => {
    let condition = {};
    let search = req.query.search;
    if (search) {
        condition[Sequelize.Op.or] = [
            { license_no: { [Sequelize.Op.like]: `%${search}%` } },
            { model: { [Sequelize.Op.like]: `%${search}%` } },
        ];
    }

    let list = await Help.findAll({
        where: condition,
        order: [['createdAt', 'DESC']],
        include: { model: User, as: "user", attributes: ['name'] }
    });
    res.json(list);
});

router.delete("/:id", validateToken, async (req, res) => {
    let id = req.params.id;
    // Check id not found
    let help = await Help.findByPk(id);
    if (!help) {
        res.sendStatus(404);
        return;
    }

    // Check request user id
    let userId = req.user.id;
    if (help.userId != userId) {
        res.sendStatus(403);
        return;
    }

    let num = await Help.destroy({
        where: { id: id }
    })
    if (num == 1) {
        res.json({
            message: "Help Email was deleted successfully."
        });
    }
    else {
        res.status(400).json({
            message: `Cannot delete Help Email with id ${id}.`
        });
    }
});

module.exports = router;