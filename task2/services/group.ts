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
    async getAll(query: any) {
        const queryParam = {
            ...(
                query.login && {where: {
                    login: {
                        [Op.iLike]: `%${query.login}%`
                    }
                }}
            ),
            limit: query.limit || 3,
        }

        const userRecords = await GroupModel.findAll(queryParam);

        return userRecords;
    }
    async create(user: any) {
        const userRecord = await GroupModel.create({
            login: user.login,
            password: user.password,
            age: user.age,
        });
        await userRecord.save();

        return userRecord;
    }
    async update(id: string, user: any) {
        const queryParam = {
            where: {
                id
            },
        }

        const userRecord = await GroupModel.findOne(queryParam);
        if (userRecord) {
            userRecord.login = user.login;
            userRecord.password = user.password;
            userRecord.age = user.age;

            await userRecord.save();
        }
        
        return { user: userRecord };
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