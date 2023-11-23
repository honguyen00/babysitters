const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class Group extends Model {}

Group.init({
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        number_of_users: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        creator_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
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
        modelName: 'group',
    }
);

module.exports = Group;