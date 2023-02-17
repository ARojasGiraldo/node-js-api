const express = require('express');
const cors = require('cors');
const routerApi = require('./routes/index');
const { config } = require('./config/config');
const morgan = require('morgan');
const {
  logErrors,
  errorHandler,
  boomErrorHandler,
} = require('./middlewares/error.handler');
const app = express();

app.use(express.json());

const whiteList = ['http://localhost:8080'];
const options = {
  origin: (origin, callback) => {
    if (whiteList.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('No Permitido'));
    }
  },
};

app.use(morgan('dev'));

app.use(cors(options));

app.get('/', (req, res) => {
  res.send('hola mi server en express');
});

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`My port is http://localhost:${config.port}`);
});
