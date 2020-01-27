import { userType } from '../types/userType';
import { UserRequestSchema } from '../validators/validator';
import { ValidatedRequest } from 'express-joi-validation';
import { Users } from '../users';

let users = [...Users];

export class Controller {
    static getUsers_get(req : any, res : any) {
        if (req.query.login) {
            let filteredUsers : Array<userType> = this.getAutoSuggestUsers(req.query.login, req.query.limit);
            if (filteredUsers.length) res.json(filteredUsers);
            else res.status(404).json({message: `Users not found`});
        } else {
            if (users) res.json([...users]);
            else res.status(404).json({message: `Users not found`});
        }
    }
    private getAutoSuggestUsers(login : string, limit : number = 3) : Array<userType> {
        if (!login) {
            return [];
        }
      
        return users.filter(user => user.login.includes(login))
            .slice(0, limit)
            .sort((a, b) => a.login.localeCompare(b.login));
    }
    static getUser_get(req : any, res : any) {
        const user = users.find(user => req.params.id === user.id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({message: `User with id ${req.params.id} not found`})
        }
    }
    static deleteUser_delete(req : any, res : any) {
        let deletedUser = null;
        let userID = req.params.id;
      
        users = users.map(user => {
            if (user.id === userID) {
                user.isDeleted = true;
                deletedUser = user;
            }
            return user;
        });

        if (deletedUser) {
            res.json(deletedUser);
        } else {
            res.status(404).json({message: `User with id ${req.params.id} not found`})
        }
    }
    static updateUser_put(req : ValidatedRequest<UserRequestSchema>, res : any) {
        let updatedUser = null;
        let userID = req.params.id;
        users = users.map(user => {
            if (user.id === userID) {
                updatedUser = {...user, ...req.body}
                return updatedUser;
            }
            return user;
        })
      
        if (updatedUser) {
            res.json(updatedUser);
        } else {
            res.status(404).json({message: `User with id ${req.params.id} not found`})
        }
    }
    static createUser_post(req : ValidatedRequest<UserRequestSchema>, res : any) {
        let newUser = {
            id: `${users.length}`,
            isDeleted: false,
            ...req.body,
        }
        users.push(newUser);
        res.json(newUser);
    }
}