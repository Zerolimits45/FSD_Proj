const express = require('express');
const router = express.Router();
const { Car } = require('../models');
const yup = require("yup");
const { validateToken } = require('../middlewares/auth');
require('dotenv').config();

// Create car
router.post('/create', validateToken, async (req, res) => {
    let data = req.body;
    // Validate request body
    let validationSchema = yup.object().shape({
        startDate: yup.string()
            .test(dateString => new Date(dateString).toString() !== 'Invalid Date'),
        endDate: yup.string()
            .test(dateString => new Date(dateString).toString() !== 'Invalid Date'),
        model: yup.string().trim().required(),
        make: yup.string().trim().required(),
        type: yup.string().trim().required(),
        gear: yup.string().trim().required(),
        seats: yup.number().required(),
        price: yup.number().required(),
        license: yup.string().trim().required(),
    })
    try {
        console.log(data);
        await validationSchema.validate(data,
            { abortEarly: false, strict: true});
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ errors: err.errors });
        return;
    }

    // Trim string values
    data.model = data.model.trim();
    data.make = data.make.trim();
    data.type = data.type.trim();
    data.gear = data.gear.trim();
    data.license = data.license.trim();
    data.userid = req.user.id;

    // Create car
    const car = await Car.create(data);
    res.json(car);
}
);

// Get all cars
router.get('/all', async (req, res) => {
    const cars = await Car.findAll();
    res.json(cars);
}
);

// Get cars by token
router.get('/user', validateToken, async (req, res) => {
    const cars = await Car.findAll({ where: { userid: req.user.id } });
    res.json(cars);
}
);

// Get car by id
router.get('/:id', async (req, res) => {
    const car = await Car.findByPk(req.params.id);
    res.json(car);
}
);



// Update car by id
router.put('/:id', validateToken, async (req, res) => {
    let data = req.body;
    data.price = parseFloat(data.price);
    // Validate request body
    let validationSchema = yup.object().shape({
        startDate: yup.string()
            .test(dateString => new Date(dateString).toString() !== 'Invalid Date'),
        endDate: yup.string()
            .test(dateString => new Date(dateString).toString() !== 'Invalid Date'),
        model: yup.string().trim().required(),
        make: yup.string().trim().required(),
        type: yup.string().trim().required(),
        gear: yup.string().trim().required(),
        seats: yup.number().required(),
        price: yup.number().required(),
        
    })
    try {
        await validationSchema.validate(data,
            { abortEarly: false, strict: true });
    }
    catch (err) {
        res.status(400).json({ errors: err.errors });
        console.log(err);
        return;
    }

    // Trim string values
    data.model = data.model.trim();
    data.make = data.make.trim();
    data.type = data.type.trim();
    data.gear = data.gear.trim();
    data.userid = req.user.id;
    // Update car
    await Car.update(data, { where: { id: req.params.id } });
    res.json({ message: `Car ${req.params.id} updated.` });
}
);

// Delete car by id
router.delete('/:id', validateToken, async (req, res) => {
    await Car.destroy({ where: { id: req.params.id } });
    res.json({ message: `Car ${req.params.id} deleted.` });
}
);

module.exports = router;
