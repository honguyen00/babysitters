const router = require('express').Router();
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
            logged_in: true, title: 'Profile',
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

