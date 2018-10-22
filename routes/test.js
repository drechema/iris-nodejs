const express = require('express');
const router = express.Router();
const db = require('../db/database.js');

// GET /test
router.get('/', function (req, res) {
    let node = {
        global: 'test',
        subscripts: [1]
    };
    db.retrieve(node, 'object', (error, result) => {
        if (error) {
            res.status(500).send(result);
        } else {
            res.status(200).send(result.object);
        }
    })
});

// POST /test
router.post('/', function (req, res) {
    let data = {
        node: {
            global: 'test',
            subscripts: [1]
        },
        object: req.body
    };
    db.update(data, 'object', (error, result) => {
        if (error) {
            res.status(500).send();
        } else {
            res.status(201).send();
        }
    });
});

module.exports = router;