const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db/database.js');
const testApi = require('./routes/test.js');

const app = express();
var corsOptions = {
    origin: 'http://example.com',
    optionsSuccessStatus: 200 
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use('/api/test', testApi);

app.listen(8000, () => {
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
    console.log('Express server started!');
});