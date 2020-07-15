const express = require('express');
const router = express.Router();
const { Page } = require("../models");  
const { addPage } = require('../views');

// RETRIEVES ALL WIKI PAGES
router.get('/', (req, res, next) => {
    res.send('got to GET /wiki/');
});

// SUBMIT A NEW PAGE TO THE DB
router.post('/', async (req, res, next) => {
    // res.send('got to POST /wiki/');
    // res.json(req.body); // => suppose to see the JSON in the browser
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

module.exports = router;