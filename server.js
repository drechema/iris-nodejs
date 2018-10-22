// External modules
const http = require('http');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db/database.js');
const { createTerminus } = require('@godaddy/terminus');

// Modules of this app
const testApi = require('./routes/test.js');

// ----------------------------------
// Create the Express app
// ----------------------------------

const app = express();
var corsOptions = {
    origin: 'http://example.com',
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use('/api/test', testApi);

// ----------------------------------
// Prepare HTTP Server
// ----------------------------------

function onSignal() {
    console.log('\nserver is starting cleanup');
    return Promise.all([
        // close the database connection
        db.close()
    ]);
}

function onShutdown() {
    console.log('cleanup finished, server is shutting down');
}

async function onHealthCheck() {
    // checks if the system is healthy, like the db connection is live
    // resolves, if health, rejects if not
    console.log('server is checking health');
    return Promise.resolve(
        // optionally include a resolve value to be included as
        // info in the healthcheck response
    )
}

const terminusOptions = {
    signal: 'SIGINT',
    healthChecks: {
        '/healthcheck': onHealthCheck,
    },
    onSignal,
    onShutdown
};

// ----------------------------------
// Create HTTP Server
// ----------------------------------

const server = http.createServer(app);
createTerminus(server, terminusOptions);

server.listen(8000, () => {
    db.open({
        ip_address: '127.0.0.1',
        tcp_port: 51773,
        username: 'superuser',
        password: '1234',
        namespace: 'USER'
    }, (error, result) => {
        if (error) {
            console.log(result);
        } else {
            console.log('IRIS connection opened!');
        }
    });
    console.log('Express web server started!');
});