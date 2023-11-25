const User = require('./User');
const Group = require('./Group');
const GroupUser = require('./GroupUser');
const Event = require('./Event');

User.belongsToMany(Group, {
    through: {
        model: GroupUser, unique: false,
    },
    onDelete: 'CASCADE'
});

Group.belongsToMany(User, {
    through: {
        model: GroupUser, unique: false,
    },
    onDelete: 'CASCADE'
});

Group.hasOne(User, {
    foreignKey: 'creator_id'
});

Event.belongsTo(User, {
    foreignKey: 'created_by'
});

Event.belongsTo(User, {
    foreignKey: 'accepted_by'
});

module.exports = { User, Group, GroupUser, Event }