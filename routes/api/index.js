const router = require('express').Router();
const userRoutes = require('./user-routes');
const groupRoutes = require('./group-routes');
const eventRoutes = require('./event-routes');
const authRoutes = require('./auth-routes');

router.use('/users', userRoutes);
router.use('/groups', groupRoutes);
router.use('/events', eventRoutes);
router.use('/auth', authRoutes);

module.exports = router;