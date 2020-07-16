const express = require('express');
const router = express.Router();
const { Page } = require("../models");  
const { addPage } = require('../views');
// const { regexp } = require('sequelize/types/lib/operators');

// RETRIEVES ALL WIKI PAGES
router.get('/', (req, res, next) => {
    res.send('got to GET /wiki/');
});

// SUBMIT A NEW PAGE TO THE DB
router.post('/', async (req, res, next) => {
    // res.send('got to POST /wiki/');
    // res.json(req.body); // => test to see the JSON in the browser
    const page = new Page ({
        title: req.body.title,
        content: req.body.content,
    });
    try {
        await page.save();
        res.redirect('/');
    } catch (err) {next(err)}
});

// RETRIEVE THE addPage FORM
router.get('/add', (req, res, next) => {
    res.send(addPage());
});

// RETRIEVE A SPECIFIC wiki/slub PAGE BY QUERING MODELS 
router.get('/:slug', async (req, res, next) => {
    // res.send(`hit dynamic route at ${req.params.slug}`);
    try {
        const page = await Page.findOne ({
            where: {
                slug: req.params.slug,
            }
        });
        res.json(page);
    } 
    catch (err) { next(err) }
});

module.exports = router;