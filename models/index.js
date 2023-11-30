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

Event.belongsTo(User, {
    foreignKey: 'created_by',
    onDelete: 'CASCADE',
    as: 'created_user'
});

User.hasMany(Event, {
    foreignKey: 'created_by',
    as: 'created_user'
});

Event.belongsTo(User, {
    foreignKey: 'accepted_by',
    onDelete: 'CASCADE',
    as: 'accepted_user'
});

User.hasMany(Event, {
    foreignKey: 'accepted_by',
    as: 'accepted_user'
});


module.exports = { User, Group, GroupUser, Event }