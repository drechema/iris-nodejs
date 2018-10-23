# IRIS NODE.JS DEMO

This repository have a demo API using node.js able to receive HTTP GET, POST and DELETE of a custom JSON object in InterSystems IRIS.

This project use:
Express Web server (<https://expressjs.com/>)

By default the server start at port 8000 and the base URL will be
 <http://localhost:8000/api/test>.

You can test:

URL | Description
--- | -----------
GET /api/test/:id | Retrive object with the specified id
GET /api/test| Retrieve all the existing objects
POST /api/test| Create a new object
POST /api/test/:id | Update object with the specified id
DELETE /api/test/:id| Delete object with the specified id

In general the API returns:

|CODE | Description |
--- | --- | ---
|200 | Updated OK|
|201 | Created OK|
|404 | Object with specified id not found|
|500 | Error in server|

## How to run

**npm** get all the packages for you except *iris.node* that must be copy manually. Copy the iris.node file to `/node_module/iris` directory (create if not exists). You can get iris.node from WRC or also from the `/bin` directory of the InterSystems IRIS installed instance. Check out if it is the right version for your node installation.
In my case I used **node version v8.6.0** so I needed `iris800.node`. Remenber to rename the file to `iris.node`. After that you can do:

```bash
$npm install
$npm start
```

## How to test

You can che conectivity with IRIS with

```bash
$node ./tests/test.js
```

If everything before works, then you can start sending HTTP commands:

Create new object

```bash
$curl -d '{"key1":"value1", "key2":"value2"}' -H "Content-Type: application/json" -X POST http://localhost:8000/api/test
```

Update existing object

```bash
$curl -d '{"key1":"abc", "key2":"abc"}' -H "Content-Type: application/json" -X POST http://localhost:8000/api/test/1
```

Retrieve all objects

```bash
$curl http://localhost:8000/api/test
```

Retrieve existing object

```bash
$curl http://localhost:8000/api/test/1
```

Delete existing object

```bash
$curl -X DELETE http://localhost:8000/api/test/1
```