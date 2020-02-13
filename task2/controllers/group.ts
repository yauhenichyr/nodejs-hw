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
        let allGroups = await groupService.getAll();

        if (allGroups) res.json(allGroups);
        else this.logger404(res);
    }
    getGroup_get = async (req : any, res : any) => {
        const user = await groupService.get(req.params.id, null);
        if (user) res.json(user);
        else this.logger404(res, req.params.id);
    }
    deleteGroup_delete = async (req : any, res : any) => {
        const deletedGroup = await groupService.remove(req.params.id);

        if (deletedGroup) res.json(deletedGroup);
        else this.logger404(res, req.params.id);
    }
    updateGroup_put = async (req : ValidatedRequest<GroupRequestSchema>, res : any) => {
        const updatedGroup = await groupService.update(req.params.id, {...req.body})

        if (updatedGroup) res.json(updatedGroup);
        else this.logger404(res, req.params.id);
    }
    createGroup_post = async (req : ValidatedRequest<GroupRequestSchema>, res : any) => {
        const newGroup = await groupService.create({...req.body});

        if (newGroup) res.json(newGroup);
        else this.logger404(res);
    }
}