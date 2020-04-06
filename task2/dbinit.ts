import { Sequelize } from 'sequelize-typescript';

import UserModel from './models/user'
import GroupModel from './models/group'
import UserGroupModel from './models/userGroup'

const sequelize = new Sequelize(process.env.DB_URI, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
        ssl: true
    },
    models: [UserModel, GroupModel, UserGroupModel],
});

export default sequelize;