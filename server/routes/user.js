const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { User } = require('../models');
const yup = require("yup");
const { sign, verify } = require('jsonwebtoken');
const { validateToken } = require('../middlewares/auth');
var nodemailer = require('nodemailer-mock');
const otpGenerator = require('otp-generator');

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'forschoolkenneth@gmail.com',
        pass: 'tlpjjfptmosioljo'
    }
});
require('dotenv').config();

// Register route
router.post('/register', async (req, res) => {
    let data = req.body;
    const regEx = /^[89]{1}\d{7}$/
    // Validate request body
    let validationSchema = yup.object().shape({
        name: yup.string().trim().min(5).max(50).required(),
        email: yup.string().trim().email().required(),
        phone: yup.string().trim().min(8).max(8).matches(regEx, "Phone is Invalid").required(),
        password: yup.string().trim().min(8).required(),
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
    data.email = data.email.trim();
    data.phone = data.phone.trim();
    data.password = data.password.trim();

    // Check email
    let emailExists = await User.findOne({
        where: { email: data.email }
    });
    if (emailExists) {
        return res.status(400).json({ message: "Email already exists." });
    }

    const otp = otpGenerator.generate(6, { digits: true, upperCase: false, specialChars: false });

    const mailOptions = {
        from: 'forschoolkenneth@gmail.com',
        to: data.email,
        subject: 'OTP Verification',
        text: `Your OTP is ${otp}.`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(mailOptions)
    } catch (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ message: 'Failed to send OTP email.' });
    }

    data.password = await bcrypt.hash(data.password, 10);
    data.role = 'customer';

    const token = sign({ otp, data }, process.env.APP_SECRET);

    res.json({ message: 'OTP sent successfully.', token: token });
})

router.post('/register_otp', async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    try {
        const decoded = verify(token, process.env.APP_SECRET);
        const otp = decoded.otp;
        const u = decoded.data;

        let data = req.body;
        let validationSchema = yup.object().shape({
            otp: yup.string().trim().length(6).required(),
        })
        try {
            await validationSchema.validate(data, { abortEarly: false, strict: true });
        } catch (err) {
            res.status(400).json({ errors: err.errors });
            return;
        }

        data.otp = data.otp.trim()

        if (otp != data.otp) {
            res.status(400).json({ message: "OTP is Incorrect" });
            return;
        }

        const user = await User.create(u);
        res.json(user);
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
})

router.post("/login", async (req, res) => {
    let data = req.body;

    // Validate request body
    let validationSchema = yup.object().shape({
        email: yup.string().trim().email().max(50).required(),
        password: yup.string().trim().min(8).max(50).required()
    });

    try {
        await validationSchema.validate(data, { abortEarly: false, strict: true });
    } catch (err) {
        res.status(400).json({ errors: err.errors });
        return;
    }

    // Trim string values
    data.email = data.email.trim();
    data.password = data.password.trim();

    // Check email and password
    let user = await User.findOne({ where: { email: data.email } });
    if (!user) {
        res.status(400).json({ message: "Email or password is incorrect" });
        return;
    }
    let match = await bcrypt.compare(data.password, user.password);
    if (!match) {
        res.status(400).json({ message: "Email or password is incorrect" });
        return;
    }

    // Return user info
    let userInfo = {
        id: user.id,
        email: user.email,
        password: user.password,
        name: user.name,
        phone: user.phone,
        role: user.role
    };
    let accessToken = sign(userInfo, process.env.APP_SECRET);
    res.json({
        accessToken: accessToken,
        user: userInfo
    });
});


router.get("/auth", validateToken, (req, res) => {
    let userInfo = {
        id: req.user.id,
        email: req.user.email,
        password: req.user.password,
        name: req.user.name,
        phone: req.user.phone,
        role: req.user.role
    };
    res.json({
        user: userInfo
    });
});

router.get("/profiles", async (req, res) => {
    let condition = {};
    let search = req.query.search;
    if (search) {
        condition[Sequelize.Op.or] = [
            { email: { [Sequelize.Op.like]: `%${search}%` } },
            { name: { [Sequelize.Op.like]: `%${search}%` } }
        ];
    }

    let list = await User.findAll({
        where: condition,
        order: [['createdAt', 'DESC']],
        attributes: ['id', 'email', 'name', 'phone']
    });
    res.json(list);
});

router.get('/profile/:id', validateToken, async (req, res) => {
    let id = req.params.id;

    const user = await User.findByPk(id);
    if (!user) {
        res.sendStatus(404);
        return;
    }

    res.send(user)
});

router.put('/profile/edit/:id', validateToken, async (req, res) => {
    let id = req.params.id;

    let user = await User.findByPk(id);
    if (!user) {
        res.sendStatus(404);
        return;
    }

    let data = req.body;
    const regEx = /^[89]{1}\d{7}$/
    let validationSchema = yup.object().shape({
        name: yup.string().trim().min(5).max(50).required(),
        email: yup.string().trim().email().required(),
        phone: yup.string().trim().min(8).max(8).matches(regEx, "Phone is Invalid").required(),
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
    data.phone = data.phone.trim();
    let num = await User.update(data, {
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

router.put('/profile/changepassword/:id', validateToken, async (req, res) => {
    let id = req.params.id;

    let user = await User.findByPk(id);
    if (!user) {
        res.sendStatus(404);
        return;
    }

    let data = req.body;
    let validationSchema = yup.object().shape({
        password: yup.string().trim().min(8).max(50).required(),
        newPassword: yup.string().trim().min(8).max(50).required(),
        confirmPassword: yup.string().trim().min(8).max(50).oneOf([yup.ref('newPassword')], 'Passwords Do Not Match').required()
    })
    try {
        await validationSchema.validate(data, { abortEarly: false, strict: true });
    } catch (err) {
        res.status(400).json({ errors: err.errors });
        return;
    }

    let match = await bcrypt.compare(data.password, user.password);
    if (!match) {
        res.status(400).json({ message: "Password is incorrect" });
        return;
    }

    data.password = data.confirmPassword;
    delete data.confirmPassword;
    delete data.newPassword;

    data.password = await bcrypt.hash(data.password, 10);

    await User.update(data, {
        where: { id: id }
    });

    res.json({
        message: "User was updated successfully."
    });
});

router.post('/forgotpassword', async (req, res) => {
    let data = req.body;
    let validationSchema = yup.object().shape({
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

    data.email = data.email.trim();
    let user = await User.findOne({ where: { email: data.email } });
    if (!user) {
        res.status(400).json({ message: "Email is incorrect" });
        return;
    }

    // Generate a password reset token
    const token = sign({ userId: user.id }, process.env.APP_SECRET)
    const resetPasswordLink = `http://localhost:5173/user/changepassword?token=${token}`;

    const mailOptions = {
        from: 'forschoolkenneth@gmail.com',
        to: user.email,
        subject: 'Password Reset Request',
        html: `Click the following link to reset your password: <a href="${resetPasswordLink}">${resetPasswordLink}</a>`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.status(500).json({ message: 'Failed to send password reset email' });
        } else {
            console.log(mailOptions)
            res.status(200).json({
                message: 'Password reset email sent',
                userId: user.id,
                token: token
            });
        }
    });
})

router.put('/forgotpassword', async (req, res) => {
    let token = req.query.token;
    try {
        const u = verify(token, process.env.APP_SECRET);
        let user = await User.findByPk(u.userId);
        if (!user) {
            res.sendStatus(404);
            return;
        }

        let data = req.body;
        let validationSchema = yup.object().shape({
            password: yup.string().trim().min(8).max(50).required(),
            confirmPassword: yup.string().trim().min(8).max(50).oneOf([yup.ref('password')], 'Passwords Do Not Match').required()
        })
        try {
            await validationSchema.validate(data, { abortEarly: false, strict: true });
        } catch (err) {
            res.status(400).json({ errors: err.errors });
            return;
        }

        data.password = data.confirmPassword;
        delete data.confirmPassword;

        data.password = await bcrypt.hash(data.password, 10);

        await User.update(data, {
            where: { id: u.userId }
        });

        res.json({
            message: "User was updated successfully."
        });

    } catch (error) {
        res.status(400).json({ message: 'Invalid token' });
        return;
    }
})


router.delete("/:id", validateToken, async (req, res) => {
    let id = req.params.id;

    let user = await User.findByPk(id);
    if (!user) {
        res.sendStatus(404);
        return;
    }

    let num = await User.destroy({
        where: { id: id }
    })
    if (num == 1) {
        res.json({
            message: "User was deleted successfully."
        });
    }
    else {
        res.status(400).json({
            message: `Cannot delete user with id ${id}.`
        });
    }
});

module.exports = router;