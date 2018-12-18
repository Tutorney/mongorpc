const pRetry = require('p-retry');
const {MongoClient} = require('mongodb');

module.exports = url =>
  async function mongoRpc(ctx) {
    const {collection, dbName, method, args = []} = ctx.request.body;
    console.log(collection, method, ...args);

    const client = await pRetry(() => MongoClient.connect(url));
    const db = client.db(dbName);
    try {
      const r = await db.collection(collection)[method](...args);
      ctx.body = typeof r.toArray === 'function' ? await r.toArray() : r;
    } finally {
      db.close();
    }
  };
