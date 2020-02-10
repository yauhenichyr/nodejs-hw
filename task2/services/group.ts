import GroupModel from '../models/group';
import { Op } from 'sequelize';

export default class UserService {
    async get(id: string) {
        const queryParam = {
            where: {
                id
            },
        }

        const userRecord = await GroupModel.findOne(queryParam);

        return userRecord;
    }
    async getAll() {
        const groupRecords = await GroupModel.findAll();

        return groupRecords;
    }
    async create(group: any) {
        const groupRecord = await GroupModel.create({
            name: group.name,
            permissions: group.permissions,
        });
        await groupRecord.save();

        return groupRecord;
    }
    async update(id: string, group: any) {
        const queryParam = {
            where: {
                id
            },
        }

        const groupRecord = await GroupModel.findOne(queryParam);
        if (groupRecord) {
            groupRecord.name = group.name;
            groupRecord.permissions = group.permissions;

            await groupRecord.save();
        }
        
        return groupRecord;
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