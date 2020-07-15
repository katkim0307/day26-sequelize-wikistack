const express = require('express');
const router = express.Router();
const { addPage } = require('../views');

module.exports = router;

// RETRIEVES ALL WIKI PAGES
router.get('/', (req, res, next) => {
    res.send('got to GET /wiki/');
});

// SUBMIT A NEW PAGE TO THE DB
router.post('/', (req, res, next) => {
    res.send('got to POST /wiki/');
});

// RETRIEVE THE addPage FORM
router.get('/add', (req, res, next) => {
    res.send(addPage());
});

module.exports = router;