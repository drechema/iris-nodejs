const express = require('express');
const router = express.Router();
const db = require('../db/database.js');
const util = require('../core/utils.js');

// Build the node for the right Global
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

// Retrieve entity from global
function retrieveEntityAt(id) {
    result = db.retrieve(getNode(id), 'object');
    result.object.id = id;
    return result.object;
}

// GET /test/:id
// Get object by id
router.get('/:id', function(req, res) {
    db.retrieve(getNode(req.params.id),'object', (error, result) => {
        if (error) {
            res.status(500).send(result);
        } else {
            if (util.isEmptyObject(result.object)) {
                res.status(404).send();
            } else {
                result.object.id = req.params.id;
                res.status(200).send(result.object);
            }
        }
    })
})

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
    db.update(data, 'object', (error, result) => {
        if (error) {
            res.status(500).send();
        } else {
            res.status(201).send();
        }
    });
});

module.exports = router;