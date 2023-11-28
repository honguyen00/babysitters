// routes/groupRoutes.js
const express = require('express');
const router = express.Router();
const GroupController = require('../controllers/groupController');

// GET all groups
router.get('/groups', GroupController.getAllGroups);

// GET a group by ID
router.get('/groups/:id', GroupController.getGroupById);

// POST a new group
router.post('/groups', GroupController.createGroup);

// PUT/update a group by ID
router.put('/groups/:id', GroupController.updateGroup);

// DELETE a group by ID
router.delete('/groups/:id', GroupController.deleteGroup);

module.exports = router;
