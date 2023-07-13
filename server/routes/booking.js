const express = require('express');
const router = express.Router();
const { Booking } = require('../models');
const yup = require("yup");
const { sign } = require('jsonwebtoken');
const { validateToken } = require('../middlewares/auth');
require('dotenv').config();

// Register route
router.post('/', validateToken, async (req, res) => {
    let data = req.body;
    // Validate request body
    let validationSchema = yup.object().shape({
        startdate: yup.date().required(),
        enddate: yup.date().required(),
        licencenumber: yup.string().trim().min(9).max(9).required(),

    })
    try {
        await validationSchema.validate(data,
            { abortEarly: false });
    }
    catch (err) {
        res.status(400).json({ errors: err.errors });
        return;
    }

    // Trim string values
    data.licencenumber = data.licencenumber.trim();
    data.startdate = new Date(data.startdate);
    data.enddate = new Date(data.enddate);
    data.userid = req.user.id

    // Create booking
    const booking = await Booking.create(data);
    res.json(booking);
})

router.get("/", async (req, res) => {
    let condition = {};
    let search = req.query.search;
    if (search) {
        condition[Sequelize.Op.or] = [
            { email: { [Sequelize.Op.like]: `%${search}%` } },
            { name: { [Sequelize.Op.like]: `%${search}%` } }
        ];
    }

    let list = await Booking.findAll({
        where: condition,
        order: [['createdAt', 'DESC']],
        attributes: ['id', 'startdate', 'enddate', 'licencenumber']
    });
    res.json(list);
});

router.get('/:id', async (req, res) => {
    try {
        let id = req.params.id;
        const booking = await Booking.findByPk(id, { attributes: ['id', 'email', 'startdate', 'enddate', 'name', 'licencenumber'] });
        res.send(booking);
    } catch (err) {
        console.log(err);
        res.status(500).send('Error retrieving booking');
    }
});

router.delete("/:id", async (req, res) => {
    let id = req.params.id;
    let num = await Booking.destroy({
        where: { id: id }
    })
    if (num == 1) {
        res.json({
            message: "Booking was deleted successfully."
        });
    }
    else {
        res.status(400).json({
            message: `Cannot delete booking with id ${id}.`
        });
    }
});

module.exports = router