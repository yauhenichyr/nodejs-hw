
import { Table, Column, Model, ForeignKey } from 'sequelize-typescript';
import UserModel from './user';
import GroupModel from './group';

@Table({
    tableName: 'UserGroup'
})
class UserGroupModel extends Model<UserGroupModel> {
    @ForeignKey(() => UserModel)
    @Column
    user_id: number;

    @ForeignKey(() => GroupModel)
    @Column
    group_id: number;
}

export default UserGroupModel;