const express = require('express');
const router = express.Router();
const { Request } = require('../models');
const yup = require("yup");
const { validateToken } = require('../middlewares/auth');

router.post("/cancelbooking", validateToken, async (req, res) => {
    try {
        const { request, bookingid } = req.body;

        // Create a new cancellation request entry
        const result = await Request.create({ request, bookingid });

        return res.json(result);
    } catch (error) {
        console.error("Error creating cancellation request:", error);
        return res.status(500).json({ message: "An error occurred while creating the cancellation request." });
    }
});

router.post("/removecar", validateToken, async (req, res) => {
    try {
        const { request, carid } = req.body;

        // Create a new cancellation request entry
        const result = await Request.create({ request, carid });

        return res.json(result);
    } catch (error) {
        console.error("Error creating cancellation request:", error);
        return res.status(500).json({ message: "An error occurred while creating the cancellation request." });
    }
});

router.get("/", validateToken, async (req, res) => {
    const requests = await Request.findAll();
    res.json(requests);
});

router.delete("/:id", async (req, res) => {
    let id = req.params.id;

    let num = await Request.destroy({
        where: { id: id }
    })
    if (num == 1) {
        res.json({
            message: "Request was deleted successfully."
        });
    }
    else {
        res.status(400).json({
            message: `Cannot delete request with id ${id}.`
        });
    }
});

module.exports = router