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

// In your User model
User.hasMany(Event, {
    foreignKey: 'created_by',
    as: 'created_events'
});

User.hasMany(Event, {
    foreignKey: 'accepted_by',
    as: 'accepted_events'
});

// In your Event model
Event.belongsTo(User, {
    foreignKey: 'created_by',
    as: 'creator'
});

Event.belongsTo(User, {
    foreignKey: 'accepted_by',
    as: 'acceptor'
});



module.exports = { User, Group, GroupUser, Event }