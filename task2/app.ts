import express from 'express';
import httpLogger from './utils/httpLogger';
import httpErrHandler from './utils/httpErrHandler';
//import logger from './utils/logger';
import routes from './routes/index';
import sequelize from './dbinit';
import initErrHandler from './utils/errHandler';

const seq = sequelize;
initErrHandler();

const app: express.Application = express();
const PORT = 3000;

app.use(express.json());
app.use(httpErrHandler);
app.use(httpLogger);
app.use('/', routes);

app.listen(PORT, function () {
  console.log(`Server listening on port ${PORT}`);
});