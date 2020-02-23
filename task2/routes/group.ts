import express from 'express';
import { GroupController } from '../controllers/group';
import { groupValidator } from '../validators/group';

const groupRouter = express.Router();

const group = new GroupController();

groupRouter.get('/', group.getGroups_get)
groupRouter.post('/', groupValidator, group.createGroup_post)

groupRouter.get('/:id', group.getGroup_get)
groupRouter.put('/:id', groupValidator, group.updateGroup_put)
groupRouter.delete('/:id', group.deleteGroup_delete)

export = groupRouter;