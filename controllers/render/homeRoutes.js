const router = require('express').Router();
const { User, Group, GroupUser, Event } = require('../../models');
const withAuth = require('../../utils/auth');

//getting homepage (need more coding in handlebars for homepage when not logged in and when logged in)
router.get('/', async (req, res) => {
    try {
        if(!req.session.logged_in) {
            res.render('homepage', {title: 'BabySitters Club'})
        } else {
            res.redirect('/home');
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

// get user profile, together with their belonged groups and events
router.get('/profile', withAuth, async (req,res) => {
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
router.get('/my-events', async (req, res) => {
    try {
        const userDetails = await User.findByPk(req.session.user_id); 

        // Fetching events created by the user
        const createdeventData = await Event.findAll({
            include: [{model: User, as: 'accepted_user', attributes: {exclude: ['password']}}],
            where: { created_by: req.session.user_id }
        });

        const created_events = createdeventData.map(item => item.get({ plain: true }));
        
        // Fetching events accepted by the user
        const acceptedeventData = await Event.findAll({
            include: [{model: User, as: 'created_user', attributes: {exclude: ['password']}}],
            where: { accepted_by: req.session.user_id }
        });
        const accepted_events = acceptedeventData.map(item => item.get({ plain: true }));
        
        res.render('events', {
            userdetails: userDetails.get({ plain: true }),
            created_events,
            accepted_events,
            logged_in: true, 
            title: 'My events',
            user_id: req.session.user_id
        });
    } catch (error) {
        res.status(500).json(error);
    }
});

// render create a new event page
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

// get all events in the joined groups
router.get('/home', async (req,res) => {
    try {
        const groups = await GroupUser.findAll({where: {
            user_id: req.session.user_id
        }})
        const groups_id = groups.map((item) => item.group_id).sort();
        const groupuser = groups_id.filter((item, index) => {return groups_id.indexOf(item) == index});
        var eventsFeed = []
        groupuser.forEach(id => {
            eventsFeed.push({group_id: id, user:[], events: []})
        });
        const membersData = await GroupUser.findAll({where: {group_id: groups_id}});
        const members = membersData.filter((item) => {
            if(item.user_id !== req.session.user_id) {
                return item.user_id
            }
        })

        var member1 = members.map((item) => item.user_id);
        var member2 = members.map((item) => {return {user: item.user_id, group: item.group_id}});
        const Members = member1.filter((item, pos) => {
            return member1.indexOf(item) == pos;
        })
        member2.forEach(member => {
            eventsFeed.forEach(item => {
                if(member.group == item.group_id) {
                    item.user.push(member.user)
                }
            }) 
        });
        
        // find all events that created by users in your joined groups, that havent been accepted
        const allEvents = await Event.findAll({
            include: [{model: User, as: 'created_user', attributes: {exclude: ['password']}}],
            where: {created_by: Members, accepted_by: null}
        })
        
        allEvents.forEach(item1 => {
            eventsFeed.forEach(item2 => {
                if(item2.user.includes(item1.created_by)) {
                    item2.events.push(item1.get({plain: true}));
                }
            });
        });     

        res.render('eventsFeed', {
            eventsFeed,
            logged_in: true, title: 'Home Feed',
            user_id: req.session.user_id
        });
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

