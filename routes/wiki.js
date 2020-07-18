const express = require('express');
const router = express.Router();
const { Page } = require("../models");
const { addPage, wikiPage, main } = require('../views');

// RETRIEVES ALL WIKI PAGES
router.get('/', async (req, res, next) => {
    //res.send('got to GET /wiki/');
    try {
        const allPages = await Page.findAll();
        res.send(main(allPages));
    } catch (err) { next(err) }

});

// SUBMIT A NEW PAGE TO THE DB
router.post('/', async (req, res, next) => {
    // res.send('got to POST /wiki/');
    // res.json(req.body); // => test to see the JSON in the browser
    const page = new Page({
        title: req.body.title,
        content: req.body.content,
        status: req.body.status,
    });
    try {
        await page.save();
        // res.redirect('/');
        res.redirect(`/wiki/${page.slug}`);
    } catch (err) { next(err) }
});

// RETRIEVE THE addPage FORM
router.get('/add', (req, res, next) => {
    res.send(addPage());
});

// RETRIEVE A SPECIFIC wiki/slug PAGE BY QUERING MODELS 
router.get('/:slug', async (req, res, next) => {
    // res.send(`hit dynamic route at ${req.params.slug}`);
    try {
        const page = await Page.findOne({
            where: {
                slug: req.params.slug,
            }
        });
        //res.json(page);
        res.send(wikiPage(page));
    }
    catch (err) { next(err) }
});

module.exports = router;