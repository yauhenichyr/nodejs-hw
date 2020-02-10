import { Sequelize, DataTypes, Model } from 'sequelize';
import dbConf from '../config/db'
const sequelize = new Sequelize(dbConf.uri, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
        ssl: true
    },
});

class GroupModel extends Model {}

GroupModel.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    permissions: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false
    },
}, {
  sequelize,
  modelName: 'Group'
});


export default GroupModel;