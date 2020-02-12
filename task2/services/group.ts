import GroupModel from '../models/group';

export default class GroupService {
    async get(id: string, transaction: any) {
        return await GroupModel.findOne({
            where: {
                id,
                transaction: transaction || null,
            },
        });
    }
    async getAll() {
        return await GroupModel.findAll();
    }
    async create(group: any) {
        return await GroupModel.create({
            name: group.name,
            permissions: group.permissions,
        });;
    }
    async update(id: string, group: any) {
        return await GroupModel.update({
            name: group.name,
            permissions: [...group.permissions]
        },{
            where: {
                id
            },
        });
    }
    async remove(id: string) {
        return await GroupModel.destroy({
            where: {
                id
            },
        });
    }
    
}