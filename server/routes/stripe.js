const express = require('express');
const { validateToken } = require('../middlewares/auth');
const router = express.Router();
const { Car } = require('../models');
const stripe = require('stripe')('sk_test_51MSFehKSkL6RrOAvS5lokJt7PBUqBlC9WgCtuePGfPi2vImYZBjm9lHqUCt2AuI84C3Vrcvyz7NogfT0CJxhYOUO00jDUeYaD4');
const { sign, verify } = require('jsonwebtoken');

const YOUR_DOMAIN = 'http://localhost:5173';

router.post('/create-checkout-session', validateToken, async (req, res) => {
    const data = req.body;
    const car = await Car.findByPk(req.query.carId);
    const session = await stripe.checkout.sessions.create({
        customer_email: req.user.email,
        line_items: [
            {
                price_data: {
                    currency: 'sgd',
                    unit_amount: data.price * 100,
                    product_data: {
                        name: `${car.make} | ${car.model} | ${car.type}`,
                        images: [`<ngrok address>/uploads/${car.imageFile}`], // This URL should point to your image
                        metadata: {
                            carId: car.id,
                        },
                    },
                },
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: `${YOUR_DOMAIN}/success`,
    });
    req.session.booking = data
    res.send({ url: session.url });
});


module.exports = router