import express from 'express';
import { UserController } from '../controllers/user';
import { userValidator } from '../validators/user';

const userRouter = express.Router();

const user = new UserController();

userRouter.get('/', user.getUsers_get)
userRouter.post('/', userValidator, user.createUser_post)

userRouter.get('/:id', user.getUser_get)
userRouter.put('/:id', userValidator, user.updateUser_put)
userRouter.put('/:id/group/:group', user.addUserToGroup_put)
userRouter.delete('/:id', user.deleteUser_delete)

export = userRouter;