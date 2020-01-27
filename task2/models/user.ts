import { Sequelize, DataTypes, Model } from 'sequelize';
import dbConf from '../config/db'
const sequelize = new Sequelize(dbConf.uri, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
        ssl: true
    },
    logging: console.log,
});

class UserModel extends Model {}

UserModel.init({
    login: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    age: {
        type: DataTypes.NUMBER,
        allowNull: false
    },
}, {
  sequelize,
  modelName: 'User'
});


export default UserModel;