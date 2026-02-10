import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db.js";
import { Product } from "./product.model.js";

interface CartAttributes {
    id?: number;
    product_id: number;
    product_qty: number;
    user_id: number;
    createdAt?: Date;
    updatedAt?: Date;
}
export class Cart extends Model<CartAttributes> implements CartAttributes {
    public id!: number;
    public product_id!: number;
    public product_qty!: number;
    public user_id!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
<<<<<<< HEAD
      declare product?: Product;
=======
>>>>>>> 14517d659aaf62f7cd84f27eff603630d000d39e
}

Cart.init(                         //Cart.init() is used to define the model (table structure).
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        product_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        product_qty: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
        },
        user_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
    },
    {
        sequelize,           // connection
        tableName: "carts",  // DB table name
        modelName: "Cart",   // Sequelize model name
        timestamps: true,
    }
);

Cart.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });

Product.hasMany(Cart, { foreignKey: 'product_id', as: 'cartItems' });   