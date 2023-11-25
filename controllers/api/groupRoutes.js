const router = require('express').Router();
const { GroupUser, Group, User } = require('../../models');
const withAuth = require('../../utils/auth');

// create a new group
router.post('/', async (req, res) => {
    try {
        const groupData = await Group.create(req.body);
        //after create new group, add creator as member of new group
        const groupuserData = await GroupUser.create({
            group_id: groupData.id,
            user_id: req.session.user_id
        })
        res.status(200).json({data: groupData, message: 'Create new group successfully'},
        {data: groupuserData, message: 'Creator has been added to new group successfully'});
    } catch (error) {
        res.status(400).json(error);
    }
});

//get a group by id, include all users in that group 
router.get('/:id', async (req, res) => {
    try {
        const groupData = await Group.findByPk(req.params.id, {include: [{model: User, through: GroupUser}]});
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
})