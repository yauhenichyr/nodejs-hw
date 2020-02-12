import GroupModel from '../models/group';

export default class UserService {
    async get(id: string) {
        return await GroupModel.findOne({
            where: {
                id
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
        const queryParam = {
            where: {
                id
            },
        }

        const userRecord = await GroupModel.findOne(queryParam);
        if (userRecord) await userRecord.destroy();

        return userRecord;
    }
    
}