const router = require('express').Router();
const { where } = require('sequelize');
const { User, Group, GroupUser, Event } = require('../../models');
const withAuth = require('../../utils/auth');

//getting homepage (need more coding in handlebars for homepage when not logged in and when logged in)
router.get('/', async (req, res) => {
    try {
        res.render('homepage', {logged_in: req.session.logged_in, title: 'BabySitters Club'})
    } catch (error) {
        res.status(500).json(error);
    }
});

// get user profile, together with their belonged groups and events
router.get('/profile', withAuth, async (req,res) => {
    console.log(req.session.user_id, req.session.logged_in);
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Group, through: GroupUser }]});
        const user = userData.get({plain: true});

        res.render('profile', {
            ...user,
            logged_in: true, title: 'My profile',
            user_id: req.session.user_id
        });
    } catch (error) {
        res.status(500).json(error);
    }
});

// get user events both created and accepted
router.get('/events', withAuth, async (req,res) => {
    try {
        const createdeventData = await Event.findAll({where: {
            created_by: req.session.user_id
        }});
        const created_events = createdeventData.map((item) => {
            return item.get({plain: true})});
        
        const acceptedeventData = await Event.findAll({
            where: {accepted_by: req.session.user_id}
        });

        const accepted_events = acceptedeventData.map((item) => {
            return item.get({plain: true})});

        res.render('events', {
            created_events,
            accepted_events,
            logged_in: true, title: 'My events',
            user_id: req.session.user_id
        });
    } catch (error) {
        res.status(500).json(error);
    }
});

// get user profile, together with their belonged groups and events
router.get('/create-event', withAuth, async (req,res) => {
    try {
        res.render('createEvent', {
            logged_in: true, title: 'Create an event',
            user_id: req.session.user_id
        });
    } catch (error) {
        res.status(500).json(error);
    }
});

// get all events in the join group
router.get('/events-feed', async (req,res) => {
    try {
        const groups = await GroupUser.findAll({where: {
            user_id: 3
        }})
        const groups_id = groups.map((item) => item.group_id);
        // res.status(200).json(groups_id);

        const membersData = await GroupUser.findAll({where: {group_id: groups_id}})
        const members = membersData.filter((item) => {
            if(item.user_id !== 3) {
                return item.user_id
            }
        }).map((item) => item.user_id)
        
        const Members = members.filter((item, pos) => {
            return members.indexOf(item) == pos;
        })

        const allEvents = await Event.findAll({
            where: {created_by: Members}
        })
        res.status(200).json(allEvents);

        // res.render('eventFeed', {
        //     userdetails: userdata,
        //     logged_in: true, title: 'Create an event',
        //     user_id: req.session.user_id
        // });

    } catch (error) {
        res.status(500).json(error);
    }
});

// getting login page
router.get('/login', (req, res) => {
    // if already logged in, redirect to homepage
    if(req.session.logged_in) {
        res.redirect('/');
        return;
    };
    // if not logged in render login handlebar
    res.render('login', {title: 'Login or Sign up'});
})

module.exports = router;

