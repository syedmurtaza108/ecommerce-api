const { DataTypes } = require('sequelize');
const sequlize = require('../db');

const User = sequlize.define('User', {
    // Model attributes are defined here
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        is: /^[0-9a-f]{64}$/i
    }
}, {
    // Other model options go here
});

module.exports = User;