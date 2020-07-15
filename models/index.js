const Sequelize = require('sequelize');
const db = new Sequelize('wikistack', 'postgres', 'jh810506', {
    dialect: 'postgres',
    logging: false,
})

// CREATE A SCHEMA FOR THE PAGE MODEL
const Page = db.define('page', {
    title: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    slug: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    status: {
        type: Sequelize.ENUM('open', 'closed'),
    },
});

// CREATE A SCHEMA FOR THE USER MODEL
const User = db.define('user', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: true,
        },
    },
});

module.exports = { db, Page, User };


