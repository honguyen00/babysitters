const router = require('express').Router();
const { User } = require('../models');
const bcrypt = require('bcrypt');
const session = require('express-session');

// POST /api/auth/register
router.post('/register', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = await User.create({
            username: req.body.username,
            password: hashedPassword,
            email: req.body.email,
            streetnumber: req.body.streetnumber,
            streetname: req.body.streetname,
            suburb: req.body.suburb,
            postcode: req.body.postcode,
        });
        req.session.user = {
            id: newUser.id
        };
        res.status(200).json(newUser);
    } catch (err) {
        res.status(400).json(err);
    }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ where: { email: req.body.email } });
        if (!user) {
            return res.status(401).json({ message: 'Incorrect email or password' });
        }
        const isValidPassword = await bcrypt.compare(req.body.password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Incorrect email or password' });
        }
        req.session.user = user;
        res.json({ message: 'You are now logged in!' });
    } catch (err) {
        res.status(500).json(err);
    }
});

// POST /api/auth/logout
router.post('/logout', (req, res) => {
    if (req.session.user) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;
