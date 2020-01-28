import express from 'express';
import router from './routers/user'

const app: express.Application = express();

app.use(express.json());

app.use('/users', router);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});