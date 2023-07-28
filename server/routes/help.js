const express = require('express');
const router = express.Router();
const { Help } = require('../models');
const yup = require("yup");
const { validateToken } = require('../middlewares/auth');
require('dotenv').config();

router.post('/', validateToken, async (req, res) => {
    let data = req.body;
    const regEx = /^[0-9a-zA-Z]+$/;
    // Validate request body
    let validationSchema = yup.object().shape({
        name: yup.string().trim().required(),
        reason: yup.string().trim().required(),
        email: yup.string().trim().email().required(),

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
    data.name = data.name.trim();
    data.reason = data.reason.trim();
    data.email = data.email.trim();

    // Create user
    const help = await Help.create(data);
    res.json(help);
});

router.get("/view/edit/:id", async (req, res) => {
    let id = req.params.id;
    let help = await Help.findByPk(id);
    if (!help) {
        res.sendStatus(404);
        return;
    }
    res.json(help);
});

router.get("/view", validateToken, async (req, res) => {
    let condition = {};

    let list = await Help.findAll({
        where: condition,
        order: [['createdAt', 'DESC']],
        attributes: ['id', 'name', 'email', 'reason']
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
router.put('/view/edit/:id', async (req, res) => {
    let id = req.params.id;

    let help = await Help.findByPk(id);
    if (!help) {
        res.sendStatus(404);
        return;
    }

    let data = req.body;
    let validationSchema = yup.object().shape({
        name: yup.string().trim().required(),
        email: yup.string().trim().email().required(),
        reason: yup.string().trim().required(),
    })
    try {
        await validationSchema.validate(data,
            { abortEarly: false, strict: true });
    }
    catch (err) {
        res.status(400).json({ errors: err.errors });
        return;
    }

    data.name = data.name.trim();
    data.email = data.email.trim();
    data.reason = data.reason.trim();
    let num = await Help.update(data, {
        where: { id: id }
    })
    if (num == 1) {
        res.json({
            message: "User was updated successfully."
        });
    }
    else {
        res.status(400).json({
            message: `Cannot update user with id ${id}.`
        });
    }
});

module.exports = router;