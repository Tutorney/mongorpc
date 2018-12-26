# MongoRPC

A RPC service that exposes the preconfigured mongodb instance publicly. This is
originally developed so that mongodb can be easily manipulated during testing
through a HTTP interface.

## Start Server

Besides running the server locally.

`MONGO_URL='mongodb://{{host}}:{{port}}/' npm start`

The image of this service is also available on [Docker Hub][3].

[3]: https://hub.docker.com/r/waitingavian/mongorpc "waitingavian/mongorpc - Docker Hub"

## Usage

```sh
curl -X POST \
  http://0.0.0.0:3002/ \
  -H 'Content-Type: application/json' \
  -d '{
    "collection": "products",
    "dbName": "mongoRpc",
    "method": "insert",
    "args": [{ "_id":0, "item": "card", "qty": 15 }]
}'
```

The cURL command above is roughly converted to the following code:

```js
(async () => {
  const {dbName, collection, method, args = []} = req.body;
  res.body = await mongoClient.db(dbName).collection(collection)[method](...args);
})();
```

To call multiple rpcs in one request sequentially, make the body an array. For example:

```sh
curl -X POST \
  http://0.0.0.0:3002/ \
  -H 'Content-Type: application/json' \
  -d '[{
    "collection": "products",
    "dbName": "mongoRpc",
    "method": "insert",
    "args": [{ "_id":0, "item": "card", "qty": 15 }]
}, {
    "collection": "products",
    "dbName": "mongoRpc",
    "method": "insert",
    "args": [{ "_id":1, "item": "card", "qty": 15 }]
}]'
```

## Run test locally

`npm test`. This command depends on `docker-compose` to instantiate a testing
mongodb.
