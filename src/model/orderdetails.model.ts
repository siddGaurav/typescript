import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db.js";

interface OrderDetailsAttributes {
    id?: number;
    order_id: number;
    product_id: number;
    product_price: number;
    price_qty: number;
    product_total: number;
    createdAt?: Date;
    updatedAt?: Date;
}
export class OrderDetails extends Model<OrderDetailsAttributes> implements OrderDetailsAttributes {
    public id!: number;
    public order_id!: number;
    public product_id!: number;
    public product_price!: number;
    public price_qty!: number;
    public product_total!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}
OrderDetails.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        order_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        product_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        product_price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        price_qty: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
        },
        product_total: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: "order_details",
        modelName: "OrderDetails",
        timestamps: true,
    });
