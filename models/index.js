const Sequelize = require('sequelize');
const db = new Sequelize('wikistack', 'postgres', 'jh810506', {
    dialect: 'postgres',
    logging: false,
})

// CREATE A SCHEMA FOR THE PAGE MODEL
const Page = db.define('page', {
    title: {
        type: Sequelize.STRING
    },
    slug: {
        type: Sequelize.STRING
    },
    content: {
        type: Sequelize.TEXT
    },
    status: {
        type: Sequelize.ENUM('open', 'closed')
    },
});

// CREATE A SCHEMA FOR THE USER MODEL
const User = db.define('user', {
    name: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
});

module.exports = { db, Page, User };


