import express from 'express';
import { Controller } from './controller';
import { validatorMW } from '../validators/validator';

const router = express.Router();

router.get('/', Controller.getUsers_get)
router.post('/', validatorMW, Controller.createUser_post)

router.get('/:id', Controller.getUser_get)
router.put('/:id', validatorMW, Controller.updateUser_put)
router.delete('/:id', Controller.deleteUser_delete)

export = router;