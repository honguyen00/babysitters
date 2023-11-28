const router = require('express').Router();
const e = require('express');
const { Group, GroupUser, User, Event } = require('../../models');

// add a new user to group
router.post('/', async (req, res) => {
    try {
            const [groupuserData, created] = await GroupUser.findOrCreate(({where: {group_id: req.body.group_id, user_id: req.body.user_id}, defaults: {
            ...req.body}}
        ));
        if(created) {
            res.status(200).json({data: groupuserData, message: 'Add user to group successfully!'})
            return
        } else {
            res.status(403).json({message: 'User is already in this group'})
        }
    } catch (error) {
        res.status(400).json(error);
    }
});

// delete a new user from a group
router.delete('/', async (req, res) => {
    try {
            const groupuserData = await GroupUser.destroy(({where: {group_id: req.body.group_id, user_id: req.body.user_id}}
        ));
        if(groupuserData) {
            res.status(200).json({data: groupuserData, message: 'Delete user from group successfully!'})
            return
        } else {
            res.status(400).json({message: 'No matching user found in the group'})
        }
    } catch (error) {
        res.status(500).json(error);
    }
})