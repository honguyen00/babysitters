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

User.hasOne(Group, {
    foreignKey: 'creator_id',
    onDelete: 'CASCADE'
});

Event.hasOne(User, {
    foreignKey: 'created_by',
    as: 'created_events'
});

Event.hasOne(User, {
    foreignKey: 'accepted_by',
    as: 'accepted_events'
})


module.exports = { User, Group, GroupUser, Event }