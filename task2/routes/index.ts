import router from 'express';
import { jwtAuth } from '../utils/jwt';

import authRouter from './auth';
import userRouter from './user';
import groupRouter from './group';

const routes = router.Router();

routes.use('/', authRouter);
routes.use('/users', jwtAuth, userRouter);
routes.use('/groups', jwtAuth, groupRouter);

export default routes;