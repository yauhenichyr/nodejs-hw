import { userType } from '../types/userType';
import { UserRequestSchema } from '../validators/validator';
import { ValidatedRequest } from 'express-joi-validation';
import UserService from '../services/user';

const userService = new UserService();

export class UserController {
    async getUsers_get(req : any, res : any) {
        let filteredUsers : Array<userType> = await userService.getAll(req.query.login);

        if (filteredUsers.length) res.json(filteredUsers);
        else res.status(404).json({message: `Users not found`});
    }
    async getUser_get(req : any, res : any) {
        const user = await userService.get(req.body);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({message: `User with id ${req.params.id} not found`})
        }
    }
    async deleteUser_delete(req : any, res : any) {
        const deletedUser = await userService.remove(req.params.id)

        if (deletedUser) {
            res.json(deletedUser);
        } else {
            res.status(404).json({message: `User with id ${req.params.id} not found`})
        }
    }
    async updateUser_put(req : ValidatedRequest<UserRequestSchema>, res : any) {
        const updatedUser = await userService.update({...req.body})

        if (updatedUser) {
            res.json(updatedUser);
        } else {
            res.status(404).json({message: `User with id ${req.params.id} not found`})
        }
    }
    async createUser_post(req : ValidatedRequest<UserRequestSchema>, res : any) {
        const newUser = await userService.create({...req.body});
        console.log(newUser)
        if (newUser) res.json(newUser);
        else res.status(404).json({message: `User hasn't been created`});
    }
}