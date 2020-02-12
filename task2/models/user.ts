import { Table, Column, Model, BelongsToMany } from 'sequelize-typescript';

import UserGroupModel from './userGroup';
import GroupModel from './group';

@Table({
    tableName: 'Users'
})
class UserModel extends Model<UserModel> {
    @Column({
        primaryKey: true,
    })
    id: number;

    @Column
    login: string;

    @Column
    password: string;

    @Column
    age: number;

    @BelongsToMany(() => GroupModel, () => UserGroupModel)
    groups: GroupModel[];
}

export default UserModel;