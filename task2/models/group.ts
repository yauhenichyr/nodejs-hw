import { Table, Column, Model, DataType, BelongsToMany } from 'sequelize-typescript';

import UserModel from './user';
import UserGroupModel from './userGroup';

@Table({
    tableName: 'Groups'
})
export default class GroupModel extends Model<GroupModel> {
    @Column({
        primaryKey: true,
    })
    id: number;

    @Column
    name: string;

    @Column(DataType.ARRAY(DataType.STRING))
    permissions: string;

    @BelongsToMany(() => UserModel, () => UserGroupModel)
    users: UserModel[];
}