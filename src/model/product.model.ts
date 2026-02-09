import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db.js";

interface ProductAttributes {
    id?: number;
    product_name: string;
    product_desc: string;
    product_img: string;
    product_price: number;
    product_unit: string;
    product_sku: string;
    cat_id: number;
    product_status?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
export class Product extends Model<ProductAttributes> implements ProductAttributes {
    public id!: number;
    public product_name!: string;
    public product_desc!: string;
    public product_img!: string;
    public product_price!: number;
    public product_unit!: string;
    public cat_id!: number;
    public product_sku!: string;
    public product_status!: boolean;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Product.init(                         //Product.init() is used to define the model (table structure).
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        product_name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        product_desc: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,

        },
        product_img: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
        },
        product_price: {
            type: DataTypes.DOUBLE,
        },
        product_unit: {
            type: DataTypes.STRING(5)
        },
        product_sku: {
            type: DataTypes.STRING(100)
        },
        product_status: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
        },
        cat_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
    },
    {
        sequelize,           // connection
        tableName: "product",  // DB table name
        modelName: "Product",   // Sequelize model name
        timestamps: true,
    }
);