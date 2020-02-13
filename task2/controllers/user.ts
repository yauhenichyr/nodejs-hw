import { UserRequestSchema } from '../validators/user';
import { ValidatedRequest } from 'express-joi-validation';
import UserService from '../services/user';

const userService = new UserService();

export class UserController {
    private logger404(response: any, id: string = '') {
        let message = id.length ? `User with id ${id} not found` : `Users not found`;
        response.status(404).json({message});
    }

    getUsers_get = async (req : any, res : any) => {
        let filteredUsers = await userService.getAll({...req.query});

        if (filteredUsers) res.json(filteredUsers);
        else this.logger404(res);
    }
    getUser_get = async (req : any, res : any) => {
        const user = await userService.get(req.params.id, req.query.groups === 'true', null);
        if (user) res.json(user);
        else this.logger404(res, req.params.id);
    }
    deleteUser_delete = async (req : any, res : any) => {
        const deletedUser = await userService.remove(req.params.id);

        if (deletedUser) res.json(deletedUser);
        else this.logger404(res, req.params.id);
    }
    updateUser_put = async (req : ValidatedRequest<UserRequestSchema>, res : any) => {
        const updatedUser = await userService.update(req.params.id, {...req.body})

        if (updatedUser) res.json(updatedUser);
        else this.logger404(res, req.params.id);
    }
    addUserToGroup_put = async(req : any, res : any) => {
        const updatedUser = await userService.addToGroup(req.params.id, req.params.group)

        if (updatedUser) res.json(updatedUser);
        else this.logger404(res, req.params.id);
    }
    createUser_post = async (req : ValidatedRequest<UserRequestSchema>, res : any) => {
        const newUser = await userService.create({...req.body});

        if (newUser) res.json(newUser);
        else this.logger404(res);
    }
}