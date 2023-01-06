const express = require('express');
const routerApi = require('./routes/index');
const {
  logErrors,
  errorHandler,
  boomErrorHandler,
} = require('./middlewares/error.handler');
const app = express();
const port = 3005;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('hola mi server en express');
});

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`My port is http://localhost:${port}`);
});
