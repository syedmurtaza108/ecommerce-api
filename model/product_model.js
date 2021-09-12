const { DataTypes } = require('sequelize');
const sequlize = require('../db');

const Product = sequlize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },

});

module.exports = Product;