import UserModel from '../models/user';

export default class UserService {
    async get(id: string) {
        const queryParam = {
            where: {
                id
            },
        }

        const userRecord = await UserModel.findOne(queryParam);

        return { user: userRecord };
    }
    async getAll(query: any) {
        const queryParam = {
            where: {
                login: {
                    $contains: [query.login],
                }
            },
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

        userRecord.login = user.login;
        userRecord.password = user.password;
        userRecord.age = user.age;

        await userRecord.save();
        return { user: userRecord };
    }
    async remove(id: string) {
        const queryParam = {
            where: {
                id
            },
        }

        const userRecord = await UserModel.findOne(queryParam);
        await userRecord.destroy();
        return { user: userRecord };
    }
    
}