const Sequelize = require('sequelize');
const db = new Sequelize('wikistack', 'postgres', 'jh810506', {
    dialect: 'postgres',
    logging: false,
})

// CREATE A SCHEMA FOR THE PAGE MODEL WITH CONFIG OBJECTS
const Page = db.define('page', {
    title: {
        type: Sequelize.STRING,  // or title: db.Sequelize.STRING
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
    tags: {
        type: Sequelize.ARRAY(Sequelize.TEXT),
        allowNull: true,
    },
    status: {
        type: Sequelize.ENUM('open', 'closed'),
    },
});

// SEQUELIZE HOOK - VALIDATING SLUG
Page.beforeValidate((pageInstance, optionsObj) => {
    // IN CASE THE TITLE IS MISSING:
    if (pageInstance.title === '') {
        pageInstance.slug = 'no_title';
    } else {
        // REMOVES ALL NON-ALPHANUMERIC CHARACTERS FROM TITLE
        // AND MAKE WHITESPACE UNDERSCORE 
        pageInstance.slug = pageInstance.title.replace(/\s+/g, '_').replace(/\W/g, '');
    }
});

// SEQUELIZE HOOK - VALIDATING/CONVERTING TAGS
Page.beforeCreate((pageInstance, optionsObj) => {
    pageInstance.tags = pageInstance.tags.split(' ');
})

// CREATE A SCHEMA FOR THE USER MODEL WITH CONFIG OBJECTS
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

Page.belongsTo(User, { as: 'author' });

module.exports = { db, Page, User };


