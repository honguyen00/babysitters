const router = require('express').Router();
const { GroupUser, Group, User } = require('../../models');
const withAuth = require('../../utils/auth');

//get all groups
router.get('/', async (req, res) => {
    try {
        const groupData = await Group.findAll();
        // req.session.save(() => {
        //     req.session.user_id = userData.id;
        //     req.session.logged_in = true;

        //     res.status(200).json({user: userData, message: 'Create new user successfully'});
        // });
        res.status(200).json(groupData);
    } catch (error) {
        res.status(400).json(error)
    }
});

// create a new group
router.post('/', async (req, res) => {
    console.log({...req.body, creator_id: req.session.user_id})
    try {
        const groupData = await Group.create({name: req.body.name, number_of_users: 1, creator_id: req.session.user_id});
        //after create new group, add creator as member of new group
        const groupuserData = await GroupUser.create({
            group_id: groupData.id,
            user_id: req.session.user_id
        })
        if(groupData) {
            res.status(200).json(groupData);
        } else {
            res.status(400).json({message: 'Cannot create group'})
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

//get a group by id, include all users in that group 
router.get('/:id', async (req, res) => {
    try {
        const groupData = await Group.findByPk(req.params.id, {include: [{model: User, through: GroupUser, attributes: {exclude: ['password']}}]});
        if(!groupData) {
            res.status(400).json({message: 'Cannot find group in the database'});
            return;
        }
        res.status(200).json(groupData);
    } catch (error) {
        res.status(500).json(error);
    }
})

//update a group by id
router.put('/:id', async (req, res) => {
    try {
        const groupData = await Group.update(req.body, {where: {
            id: req.params.id
        }});
        res.status(200).json({data: groupData, message: 'Update group details successfully'});
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;
