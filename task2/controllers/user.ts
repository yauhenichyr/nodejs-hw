import { userType } from '../types/userType';
import { UserRequestSchema } from '../validators/validator';
import { ValidatedRequest } from 'express-joi-validation';
import UserService from '../services/user';

const userService = new UserService();

export class UserController {
    private logger404 = (res: any, id: string) => {
        let message = id ? `User with id ${id} not found` : `Users not found`;
        res.status(404).json({message});
    }

    async getUsers_get(req : any, res : any) {
        let filteredUsers : Array<userType> = await userService.getAll({...req.query});

        if (filteredUsers.length) res.json(filteredUsers);
        else this.logger404(res, '');
    }
    async getUser_get(req : any, res : any) {
        const user = await userService.get(req.params.id);
        if (user) res.json(user);
        else this.logger404(res, req.params.id);
    }
    async deleteUser_delete(req : any, res : any) {
        const deletedUser = await userService.remove(req.params.id);

        if (deletedUser) res.json(deletedUser);
        else this.logger404(res, req.params.id);
    }
    async updateUser_put(req : ValidatedRequest<UserRequestSchema>, res : any) {
        const updatedUser = await userService.update(req.params.id, {...req.body})

        if (updatedUser) res.json(updatedUser);
        else this.logger404(res, req.params.id);
    }
    async createUser_post(req : ValidatedRequest<UserRequestSchema>, res : any) {
        const newUser = await userService.create({...req.body});

        if (newUser) res.json(newUser);
        else this.logger404(res, '');
    }
}