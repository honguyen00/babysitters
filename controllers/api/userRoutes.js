const router = require('express').Router();
const { Group, GroupUser, User, Event } = require('../../models');
const withAuth = require('../../utils/auth');

//get all uses
router.get('/', async (req, res) => {
    try {
        const userData = await User.findAll();
        res.status(200).json(userData);
    } catch (error) {
        res.status(400).json(error)
    }
});

//get a user by id, include all groups and events for that user 
router.get('/:id', async (req, res) => {
    try {
        const userData = await User.findByPk(req.params.id, {include: 
            [{model: Group, through: {attributes: []}}, {model: Event, as: 'created_events'}],
            attributes: {exclude: ['password']}});
        if(!userData) {
            res.status(400).json({message: 'Cannot find user in the database'});
            return;
        }
        res.status(200).json(userData);
    } catch (error) {
        res.status(500).json(error);
    }
})


//create a new user
router.post('/', async (req, res) => {
    try {
        const [userData, created] = await User.findOrCreate({where: {email: req.body.email}, defaults: {
            ...req.body
        }});
        if(created) {
            req.session.save(() => {
                req.session.user_id = userData.id;
                req.session.logged_in = true;
    
                res.status(200).json({user: userData, message: 'Create new user successfully'});
            });
        } else {
            res.status(403).json({message: 'Email has already been registered as an user!'})
        }
    } catch (error) {
        res.status(400).json(error)
    }
});

//update information for an existing user
router.put('/:id', async (req, res) => {
    try {
        const userData = await User.update(req.body,{
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({user: userData, message: 'Update user info successfully'});
    } catch (error) {
        res.status(400).json(error);
    }
});

//deleting existing user
router.delete('/:id', async (req, res) => {
    try {
        const userData = await User.destroy({where: {
            id: req.params.id 
        }});
        res.status(200).json({user: userData, message: 'Delete user successfully'})
    } catch (error) {
        res.status(400).json(error);
    }
})

//user tries login
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({where: {email: req.body.email}});
        if(!userData) {
            res.status(400).json({message: 'Incorrect email or password, please try again!'});
            return;
        }
        const validPassword = await userData.checkPassword(req.body.password);
        if(!validPassword) {
            res.status(400).json({message: 'Incorrect email or password, please try again!'});
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            res.status(200).json({user: userData, message: 'Logged in successfully!'})
        });
    } catch (error) {
        res.status(500).json(error);
    }
});

// user tries logout
router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
})

module.exports = router;
