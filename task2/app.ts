import express from 'express';
import morgan from 'morgan';
import routes from './routes/index';
import sequelize from './dbinit';

const seq = sequelize;

const app: express.Application = express();

app.use(express.json());
app.use(morgan('combined'))
app.use('/', routes);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});