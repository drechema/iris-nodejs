const express = require('express');
const router = express.Router();
const db = require('../db/database.js');

function getNode(id) {
    let node = {
        global: 'test'
    };
    if (id) {
        node.subscripts = new Array();
        node.subscripts.push(id);
    };
    return node;
}

// GET /test
// Get all the entities in 'test' global
router.get('/', function (req, res) {
    db.retrieve(getNode(), 'list', (error, result) => {
        if (error) {
            res.status(500).send(result);
        } else {
            var entities = new Array();
            result.forEach(element => {
                let entity = retrieveEntityAt(element);
                entities.push(entity);
            });
            res.status(200).send(entities);
        }
    })
});

// Retrieve on entity from global
function retrieveEntityAt(id) {
    result = db.retrieve(getNode(id), 'object');
    result.object.id = id;
    return result.object;
}

// POST /test
router.post('/', function (req, res) {
    // get new id
    var counter = db.increment(getNode());
    if (!counter.ok) {
        res.status(500).send('Cannot get new id');
        return;
    }
    // save object with new id
    let data = {
        node: getNode(counter.data),
        object: req.body
    };
    console.log(data);
    db.update(data, 'object', (error, result) => {
        if (error) {
            res.status(500).send();
        } else {
            res.status(201).send();
        }
    });
});

module.exports = router;