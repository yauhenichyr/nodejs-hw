import sequelize from '../dbinit';

import UserModel from '../models/user';
import UserGroupModel from '../models/userGroup';
import GroupService from './group';
import { Op, Transaction } from 'sequelize';

const groupService = new GroupService();

class UserService {
    async get(id: string, groups: boolean, transaction?: Transaction) {
        let user : any = await UserModel.findOne({
            where: {
                id,
            },
            transaction,
        });
        return groups ? user.groups : user;
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
        return await UserModel.create({
            login: user.login,
            password: user.password,
            age: user.age,
        });
    }
    async update(id: string, user: any) {
        return await UserModel.update({
            login: user.login,
            password: user.password,
            age: user.age,
        }, {
            where: {
                id
            },
        });
    }
    async addToGroup(id: string, groupID: string) {
        await sequelize.transaction(async (tr: Transaction) => {
            const user = await this.get(id, false, tr);
            const gr = await groupService.get(groupID, tr);
            if (user && gr) {
                return await UserGroupModel.create({
                    user_id: id,
                    group_id: groupID,
                }, {
                    transaction: tr
                })
            }
            return null;
        });
    }
    async remove(id: string) {
        return await UserModel.destroy({
            where: {
                id
            },
        });
    }
}

export default new UserService();