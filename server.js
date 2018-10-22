const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const storage = require('node-persist');

const app = express();
var corsOptions = {
    origin: 'http://example.com',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
};
app.use(cors(corsOptions));
app.use(bodyParser.json());

(async () => {
    await storage.init();
})();

app.listen(8000, () => {
    console.log('Server started!');
});

app.route('/api/test').get((req, res) => {
    (async () => {
        res.status(200).send(await storage.getItem('test'));
    })();
});
app.route('/api/test').post((req, res) => {
    (async () => {
        await storage.setItem('test', req.body);
        console.log('STORAGE:', await storage.getItem('test'));
        res.status(201).send(req.body)
    })();
});