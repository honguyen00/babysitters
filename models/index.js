const User = require('./Users');
const Group = require('./Groups');
const GroupUser = require('./GroupUsers');
const Event = require('./Event');

User.belongsToMany(Group, {
    through: {
        model: GroupUser, unique: false,
    },
    onDelete: 'CASCADE'
});

Group.belongsTo(User, {
    foreignKey: 'creator_id'
});

Event.belongsTo(User, {
    foreignKey: 'created_by'
});

Event.belongsTo(User, {
    foreignKey: 'accepted_by'
});

