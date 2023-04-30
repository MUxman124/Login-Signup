import {DataTypes, Model } from 'sequelize';
import database from '../utils/database.js';

const sequelize = database.getDB("mysql");

class UserModel extends Model {}

UserModel.init({

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    authTokenNonce: {
        type: DataTypes.STRING,
        allowNull: true
    }

}, {
    sequelize, 
    modelName: 'User'
});

UserModel.sync();

export default UserModel;