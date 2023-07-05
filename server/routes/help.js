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
        name: yup.string().trim().required(),
        reason: yup.string().trim().required(),
        email: yup.string().trim().email().required(),
        model: yup.string().trim().required(),
        make: yup.string().trim().required(),
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
    data.name = data.name.trim();
    data.reason = data.reason.trim();
    data.email = data.email.trim();
    data.model = data.model.trim();
    data.make = data.make.trim();
    data.license_no = data.license_no.trim();

    // Create user
    const help = await Help.create(data);
    res.json(help);
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
        attributes: ['name', 'license_no', 'reason']   // lists out the elements in the table according to params such as 'name' and 'license_no'
    });
    res.json(list);
});

router.delete("/:id", async (req, res) => {
    let id = req.params.id;
    // Check id not found
    let help = await Help.findByPk(id);
    if (!help) {
        res.sendStatus(404);
        return;
    }

    // Check request user id
    /* let userId = req.user.id;
    if (help.userId != userId) {
        res.sendStatus(403);
        return;
    } */

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