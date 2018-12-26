const pRetry = require('p-retry');
const {MongoClient} = require('mongodb');

const call = async (url, {collection, dbName, method, args = []}) => {
  console.log(collection, method, ...args);

  const client = await pRetry(() => MongoClient.connect(url), {
    maxRetryTime: 30000,
  });
  const db = client.db(dbName);
  try {
    const r = await db.collection(collection)[method](...args);
    return r && typeof r.toArray === 'function' ? await r.toArray() : r;
  } finally {
    db.close();
  }
};

module.exports = url =>
  async function mongoRpc(ctx) {
    let body;
    if (Array.isArray(ctx.request.body)) {
      body = [];
      for (const rpc of ctx.request.body) {
        body.push(await call(url, rpc));
      }
    } else {
      body = await call(url, ctx.request.body);
    }
    ctx.body = body;
  };
