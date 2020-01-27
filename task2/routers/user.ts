import express from 'express';
import { UserController } from '../controllers/user';
import { validatorMW } from '../validators/validator';

const router = express.Router();

const user = new UserController();

router.get('/', user.getUsers_get)
router.post('/', validatorMW, user.createUser_post)

router.get('/:id', user.getUser_get)
router.put('/:id', validatorMW, user.updateUser_put)
router.delete('/:id', user.deleteUser_delete)

export = router;