import UserModel from '../models/user';
import { Op } from 'sequelize';

export default class UserService {
    async get(id: string) {
        return await UserModel.findOne({
            where: {
                id
            },
        });
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

        return await UserModel.findAll(queryParam);
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
        const userRecord = await UserModel.findOne({
            where: {
                id
            },
        });
        if (userRecord) await userRecord.destroy();

        return userRecord;
    }
    
}