import UserModel from '../models/user';

export default class AuthService {
    async login(login: string, password: string) {
        return await UserModel.findOne({
            where: {
                login,
                password,
            },
        });
    }
}