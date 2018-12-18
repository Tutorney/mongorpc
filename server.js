const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const mongoRpc = require('./mongoRpc');

const {
  HOSTNAME = '0.0.0.0',
  MONGO_URL = 'mongodb://0.0.0.0:27017/',
  PORT = 3002,
} = process.env;

const app = new Koa();
app.use(bodyParser());
app.use(mongoRpc(MONGO_URL));
app.listen(PORT, HOSTNAME, () => {
  console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
});
