const express = require('express');
const router = express.Router();
const { Page, User } = require('../models');
const { userList, userPages } = require('../views');

// RETRIEVES ALL USERS
router.get('/', async (req, res, next) => {
    try {
        const users = await User.findAll();
        res.send(userList(users));
    } catch (err) { next(err) }
});

// SINGLE USER PAGE
router.get('/:userId', async (req, res, next) => {
    try {
        // const user = await User.findByPk(req.params.userId);
        // const pages = await Page.findAll ({
        //     where: {
        //         authorId: req.params.userId
        //     }
        // });
        // res.send(userPages(user, pages));

        // BY USING EAGER LOADING, WE QUERY ONCE TO RETRIEVE USER'S PAGES
        // INSTEAD OF USING TWO QUERIES LIKE ABOVE
        const user = await User.findOne({
            where: {
                id: req.params.userId,
            },
            include: Page,  
        })
        res.send(user);
    } catch (err) { next(err) }
});

module.exports = router;