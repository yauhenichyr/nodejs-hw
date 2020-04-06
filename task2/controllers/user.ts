import { UserRequestSchema } from '../validators/user';
import { ValidatedRequest } from 'express-joi-validation';
import userService from '../services/user';

import logger from '../utils/logger'

class UserController {
    private set404status(response: any, message: string) {
        logger.error(message);
        response.status(404).json({message});
    }

    getUsers_get = async (req : any, res : any) => {
        let filteredUsers = await userService.getAll({...req.query});

        if (filteredUsers) res.json(filteredUsers);
        else this.set404status(res, `[${req.method}] Users not found`);
    }
    getUser_get = async (req : any, res : any) => {
        const user = await userService.get(req.params.id, req.query.groups === 'true');
        if (user) res.json(user);
        else this.set404status(res, `[${req.method}] User with id ${req.params.id} not found`);
    }
    deleteUser_delete = async (req : any, res : any) => {
        const deletedUser = await userService.remove(req.params.id);

        if (deletedUser) res.json(deletedUser);
        else this.set404status(res, `[${req.method}] User with id ${req.params.id} not found`);
    }
    updateUser_put = async (req : ValidatedRequest<UserRequestSchema>, res : any) => {
        const updatedUser = await userService.update(req.params.id, {...req.body})

        if (updatedUser) res.json(updatedUser);
        else this.set404status(res, `[${req.method}] User with id ${req.params.id} not found`);
    }
    addUserToGroup_put = async(req : any, res : any) => {
        const updatedUser = await userService.addToGroup(req.params.id, req.params.group)

        if (updatedUser as any) res.json(updatedUser);
        else this.set404status(res, `[${req.method}] User with id ${req.params.id} not found`);
    }
    createUser_post = async (req : ValidatedRequest<UserRequestSchema>, res : any) => {
        const newUser = await userService.create({...req.body});

        if (newUser) res.json(newUser);
        else this.set404status(res, `[${req.method}] User wasn't created`);
    }
}

export default new UserController();