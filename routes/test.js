const express = require('express');
const router = express.Router();
const db = require('../db/database.js');

// GET /test
router.get('/', function (req, res) {
    res.status(200).send('OK');
});

// POST /test
router.post('/', function (req, res) {
    let node = {
        global: 'test',
        subscripts: [1],
        data: req.body
    };
    db.set(node, (error, result) => {
        if (error) {
            res.status(500).send();
        } else {
            res.status(201).send();
        }
    });
});

module.exports = router;