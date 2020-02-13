import { Table, Column, Model, DataType, BelongsToMany } from 'sequelize-typescript';

import UserGroupModel from './userGroup';
import GroupModel from './group';

@Table({
    tableName: 'Users'
})
class UserModel extends Model<UserModel> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
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