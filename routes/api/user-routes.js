const router = require('express').Router();
const { User } = require('../models');

router.get('/', async (req, res) => {
    try {
        const userData = await User.findAll();
        res.json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        res.status(200).json(newUser);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updatedUser = await User.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        if (!updatedUser[0]) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
        }
        res.json(updatedUser);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const userData = await User.destroy({
            where: {
                id: req.params.id
            }
        });
        if (!userData) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
        }
        res.json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
