import express from 'express';
import userController from '../controllers/user';
import { userValidator } from '../validators/user';

const userRouter = express.Router();

userRouter.get('/', userController.getUsers_get)
userRouter.post('/', userValidator, userController.createUser_post)

userRouter.get('/:id', userController.getUser_get)
userRouter.put('/:id', userValidator, userController.updateUser_put)
userRouter.put('/:id/group/:group', userController.addUserToGroup_put)
userRouter.delete('/:id', userController.deleteUser_delete)

export = userRouter;