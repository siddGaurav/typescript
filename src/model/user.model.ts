import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db.js";

interface UserAttributes {
    id?: number;
    name: string;
    email: string;
    phone: string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
}
export class User extends Model<UserAttributes> implements UserAttributes {
    public id!: number;
    public name!: string;
    public email!: string;
    public phone!: string;
    public password!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(150),
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        phone: {
            type: DataTypes.STRING(12),
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING(255),
        }
    },
    {
        sequelize,           // connection
        tableName: "accounts",  // DB table name
        modelName: "User",   // Sequelize model name
        timestamps: true,
    }
);