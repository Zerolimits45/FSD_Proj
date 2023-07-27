const express = require('express');
const router = express.Router();
const { Booking, Car } = require('../models');
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
        enddate: yup.date().required().min(yup.ref('startdate'), "End date must be after start date"),
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
    data.status = 'Ongoing';
    data.userid = req.user.id
    data.carid = data.carid;
    data.price = data.price

    // Create booking
    const booking = await Booking.create(data);
    res.json(booking);
})

router.get("/", validateToken, async (req, res) => {
    let condition = {};

    let list = await Booking.findAll({
        where: condition,
        order: [['createdAt', 'DESC']],
        attributes: ['id', 'startdate', 'enddate', 'licencenumber', 'price', 'status']
    });
    res.json(list);
});

router.get('/:id', async (req, res) => {
    try {
        let id = req.params.id;
        const booking = await Booking.findByPk(id, { attributes: ['id', 'startdate', 'enddate', 'licencenumber', 'price', 'status', 'userid', 'carid'] });
        res.send(booking);
    } catch (err) {
        console.log(err);
        res.status(500).send('Error retrieving booking');
    }
});

router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const booking = await Booking.findByPk(id);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        let data = req.body;
        let validationSchema = yup.object().shape({
            startdate: yup.date().required(),
            enddate: yup.date().required().min(yup.ref('startdate'), "End date must be after start date"),
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

        data.licencenumber = data.licencenumber.trim();
        data.startdate = new Date(data.startdate);
        data.enddate = new Date(data.enddate);

        let num = await Booking.update(data, {
            where: { id: id }
        })
        if (num == 1) {
            res.json({
                message: "Booking was updated successfully."
            });
        }
        else {
            res.status(400).json({
                message: `Cannot update Booking with id ${id}.`
            });
        }
        
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Error updating booking status' });
    }
});

router.get('/user/:id', validateToken, async (req, res) => {
    let list = await Booking.findAll({
        where: { userid: req.params.id },
        order: [['createdAt', 'DESC']],
        attributes: ['id', 'startdate', 'enddate', 'licencenumber', 'price', 'status'],
        include: [
            {
                model: Car,
                as: 'car',
                attributes: ['model', 'make', 'type'],
            },
        ],
    });
    res.json(list);
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

router.put('/complete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const booking = await Booking.findByPk(id);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        booking.status = 'Completed';
        await booking.save();

        res.json(booking);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Error updating booking status' });
    }
});

module.exports = router