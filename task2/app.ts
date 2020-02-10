import express from 'express';
import userRouter from './routers/user'
import groupRouter from './routers/group'

const app: express.Application = express();

app.use(express.json());

app.use('/users', userRouter);
app.use('/groups', groupRouter);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});