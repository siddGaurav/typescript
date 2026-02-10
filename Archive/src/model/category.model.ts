import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db.js";

interface CategoryAttributes {
    id?: number;
    cat_name: string;
    cat_desc: string;
    cat_slug: string;
    cat_status?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
export class Category extends Model<CategoryAttributes> implements CategoryAttributes {
    public id!: number;
    public cat_name!: string;
    public cat_desc!: string;
    public cat_slug!: string;
    public cat_status!: boolean;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Category.init(                         //Category.init() is used to define the model (table structure).
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        cat_name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        cat_desc: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,

        },
        cat_slug: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
        },
        cat_status: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
        },
    },
    {
        sequelize,           // connection
        tableName: "categories",  // DB table name
        modelName: "Category",   // Sequelize model name
        timestamps: true,
    }
);