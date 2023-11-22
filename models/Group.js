const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');

class Group extends Model {}

Group.init(
    {
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
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        creatorId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            },
        },
        groupCode: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true, 
        },
    },
    {
        sequelize,
        timestamps: true, 
        freezeTableName: true,
        underscored: true,
        modelName: 'group',
    }
);
