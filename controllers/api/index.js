const router = require('express').Router();
const userRoutes = require('./userRoutes');
const groupRoutes = require('./groupRoutes');
const eventRoutes = require('./eventRoutes');
const groupuserRoutes = require('./groupuserRoutes');

router.use('/users', userRoutes);
router.use('/groups', groupRoutes);
router.use('/events', eventRoutes);
router.use('/groupuser', groupuserRoutes);

module.exports = router;
