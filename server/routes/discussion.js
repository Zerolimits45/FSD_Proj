const express = require('express')
const router = express.Router();
const { Discussion, Sequelize, User, Comment } = require('../models')
const yup = require("yup");
const { validateToken } = require('../middlewares/auth');
require('dotenv').config();

router.post("/", validateToken, async (req, res) => {
    let data = req.body;
    // Validate request body
    let validationSchema = yup.object({
        title: yup.string().trim().min(3).max(100).required(),
        description: yup.string().trim().min(3).max(500).required()
    });
    try {
        await validationSchema.validate(data,
            { abortEarly: false });
    }
    catch (err) {
        console.error(err);
        res.status(400).json({ errors: err.errors });
        return;
    }
    data.title = data.title.trim();
    data.description = data.description.trim();
    data.commentsCount = 0;
    data.userid = req.user.id;
    let result = await Discussion.create(data);
    res.json(result);
});

router.get("/", validateToken, async (req, res) => {
    let condition = {};
    let search = req.query.search;
    if (search) {
        condition[Sequelize.Op.or] = [
            { title: { [Sequelize.Op.like]: `%${search}%` } },
            { description: { [Sequelize.Op.like]: `%${search}%` } }
        ];
    }
    let list = await Discussion.findAll({
        where: condition,
        order: [['createdAt', 'DESC']],
        attributes: ['id', 'title', 'description', 'commentsCount', 'createdAt'],
        include: [
            {
                model: User,
                as: 'user',
                attributes: ['name'],
            },
        ]
    });
    for (let discussion of list) {
        const comment = await Comment.findAll({ where: { discussionid: discussion.id } })
        discussion.commentsCount = comment.length;
    }

    res.json(list);
});

router.get("/comments/:id", async (req, res) => {
    let id = req.params.id;
    let comment = await Comment.findAll({ where: { discussionid: id } })
    // Check id not found
    if (!comment) {
        res.sendStatus(404);
        return;
    }
    res.json(comment);
});

router.post("/comment/:id", validateToken, async (req, res) => {
    let data = req.body;
    // Validate request body
    let validationSchema = yup.object({
        description: yup.string().trim().min(3).max(500).required()
    });
    try {
        await validationSchema.validate(data,
            { abortEarly: false });
    }
    catch (err) {
        console.error(err);
        res.status(400).json({ errors: err.errors });
        return;
    }
    data.description = data.description.trim();
    data.discussionid = req.params.id;
    let result = await Comment.create(data);
    res.json(result);
});

router.get("/user", validateToken, async (req, res) => {
    let list = await Discussion.findAll({
        where: {userid: req.user.id},
        order: [['createdAt', 'DESC']],
        attributes: ['id', 'title', 'description', 'commentsCount', 'createdAt'],
        include: [
            {
                model: User,
                as: 'user',
                attributes: ['name'],
            },
        ]
    });
    for (let discussion of list) {
        const comment = await Comment.findAll({ where: { discussionid: discussion.id } })
        discussion.commentsCount = comment.length;
    }

    res.json(list);
});

router.get("/:id", async (req, res) => {
    let id = req.params.id;
    let discussion = await Discussion.findByPk(id);
    // Check id not found
    if (!discussion) {
        res.sendStatus(404);
        return;
    }
    res.json(discussion);
});

router.put("/:id", async (req, res) => {
    let id = req.params.id;
    // Check id not found
    let discussion = await Discussion.findByPk(id);
    if (!discussion) {
        res.sendStatus(404);
        return;
    }
    let data = req.body;
    // Validate request body
    let validationSchema = yup.object({
        title: yup.string().trim().min(3).max(100).required(),
        description: yup.string().trim().min(3).max(500).required()
    });
    try {
        await validationSchema.validate(data,
            { abortEarly: false });
    }
    catch (err) {
        console.error(err);
        res.status(400).json({ errors: err.errors });
        return;
    }
    data.title = data.title.trim();
    data.description = data.description.trim();
    let num = await Discussion.update(data, {
        where: { id: id }
    });
    if (num == 1) {
        res.json({
            message: "Discussion was updated successfully."
        });
    }
    else {
        res.status(400).json({
            message: `Cannot update discussion with id ${id}.`
        });
    }
});

router.delete("/:id", async (req, res) => {
    let id = req.params.id;

    await Comment.destroy({
        where: { discussionid: id }
    });

    let num = await Discussion.destroy({
        where: { id: id }
    })
    if (num == 1) {
        res.json({
            message: "Discussion was deleted successfully."
        });
    }
    else {
        res.status(400).json({
            message: `Cannot delete discussion with id ${id}.`
        });
    }
});
module.exports = router;