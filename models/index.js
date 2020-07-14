const Sequelize = require('sequelize');
const db = new Sequelize('wikistack', 'postgres', 'jh810506', {
    dialect: 'postgres',
    logging: false,
})

module.exports = { db }


