const { User, Group, Event } = require('../models');

const groupController = {
  // Implement logic for group routes

  // Get all groups
  getAllGroups: async (req, res) => {
    try {
      const groups = await Group.findAll({
        include: [{ model: User }, { model: Event }],
      });

      res.render('allGroups', { groups, title: 'All Groups' });
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // Add logic to get group details
  getGroupDetails: async (req, res) => {
    try {
      const groupId = req.params.id; // Assuming the group ID is in the route parameters

      // Implement logic to get group details, including associated users and events
      const groupData = await Group.findByPk(groupId, {
        include: [{ model: User }, { model: Event }],
      });

      const group = groupData.get({ plain: true });

      res.render('groupDetails', {
        ...group,
        title: 'Group Details',
      });
    } catch (error) {
      res.status(500).json(error);
    }
  },

};

module.exports = groupController;
