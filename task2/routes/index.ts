import router from 'express';

import userRouter from './user';
import groupRouter from './group';

const routes = router.Router();

routes.use('/users', userRouter);
routes.use('/groups', groupRouter);

export default routes;