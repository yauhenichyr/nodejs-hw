import UserModel from '../models/user';
import { Op } from 'sequelize';

export default class UserService {
    async get(id: string) {
        const queryParam = {
            where: {
                id
            },
        }

        const userRecord = await UserModel.findOne(queryParam);

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

        const userRecords = await UserModel.findAll(queryParam);

        return userRecords;
    }
    async create(user: any) {
        const userRecord = await UserModel.create({
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

        const userRecord = await UserModel.findOne(queryParam);
        if (userRecord) {
            userRecord.login = user.login;
            userRecord.password = user.password;
            userRecord.age = user.age;

            await userRecord.save();
        }
        
        return userRecord;
    }
    async remove(id: string) {
        const queryParam = {
            where: {
                id
            },
        }

        const userRecord = await UserModel.findOne(queryParam);
        if (userRecord) await userRecord.destroy();

        return userRecord;
    }
    
}