const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class GroupUser extends Model {}

GroupUser.init({
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        group_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: false,
            references: {
                model: 'group',
                key: 'id'
            }
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: false,
            references: {
                model: 'user',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'groupuser',
    }
);

module.exports = GroupUser;