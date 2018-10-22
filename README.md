# IRIS NODE.JS DEMO

This is a demo application using node.js able to receive HTTP GET and POST on <http://localhost:8000/api/test>.

First test conectivity with IRIS

´´´
$node test.js
´´´

## How to run

´´´
$ npm install
$ npm start
´´´

## How to test

´´´
$curl -d '{"key1":"value1", "key2":"value2"}' -H "Content-Type: application/json" -X POST <http://localhost:8000/api/test>

$curl <http://localhost:8000/api/test>
´´´