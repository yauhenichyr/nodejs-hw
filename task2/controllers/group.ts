import { groupType } from '../types/groupType';
import { GroupRequestSchema } from '../validators/group';
import { ValidatedRequest } from 'express-joi-validation';
import GroupService from '../services/group';

const groupService = new GroupService();

export class GroupController {
    private logger404(response: any, id: string = '') {
        let message = id.length ? `Group with id ${id} not found` : `Groups not found`;
        response.status(404).json({message});
    }

    getGroups_get = async (req : any, res : any) => {
        let filteredUsers : Array<groupType> = await groupService.getAll({...req.query});

        if (filteredUsers) res.json(filteredUsers);
        else this.logger404(res);
    }
    getGroup_get = async (req : any, res : any) => {
        const user = await groupService.get(req.params.id);
        if (user) res.json(user);
        else this.logger404(res, req.params.id);
    }
    deleteGroup_delete = async (req : any, res : any) => {
        const deletedUser = await groupService.remove(req.params.id);

        if (deletedUser) res.json(deletedUser);
        else this.logger404(res, req.params.id);
    }
    updateGroup_put = async (req : ValidatedRequest<GroupRequestSchema>, res : any) => {
        const updatedUser = await groupService.update(req.params.id, {...req.body})

        if (updatedUser) res.json(updatedUser);
        else this.logger404(res, req.params.id);
    }
    createGroup_post = async (req : ValidatedRequest<GroupRequestSchema>, res : any) => {
        const newUser = await groupService.create({...req.body});

        if (newUser) res.json(newUser);
        else this.logger404(res);
    }
}