import router from 'express';

import authRouter from './auth';
import userRouter from './user';
import groupRouter from './group';

const routes = router.Router();

routes.use('/', authRouter);
routes.use('/users', userRouter);
routes.use('/groups', groupRouter);

export default routes;