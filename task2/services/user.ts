import UserModel from '../models/user';

export default class UserService {
    async get(id: string) {
        const userRecord = await UserModel.create();

        return { user: userRecord };
    }
    async getAll(login: string) {
        const userRecord = await UserModel.findAll();

        return userRecord;
    }
    async create(user: any) {
        console.log('serv', user)
        const userRecord = await UserModel.create({
            login: user.login,
            password: user.password,
            age: user.age,
        });

        return userRecord;
    }
    async update(user: any) {
        const userRecord = await UserModel.create(user);
        await userRecord.save();
        return { user: userRecord };
    }
    async remove(user: any) {
        const userRecord = await UserModel.create(user);

        return { user: userRecord };
    }
    
}