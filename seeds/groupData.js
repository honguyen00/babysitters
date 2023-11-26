const {Group} = require('../models');

const groupData = [
    {
        name: 'This is group 1',
        creator_id: 1
    },
    {
        name: 'This is group 2',
        creator_id: 5
    },
    {
        name: 'This is group 3',
        creator_id: 3
    },
]

const groupSeed = () => Group.bulkCreate(groupData);

module.exports = groupSeed;