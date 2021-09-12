const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(
    'ecommerce-db',
    'root',
    'click123', { dialect: 'mysql' }, );

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database2:', err);
    });

module.exports = sequelize;