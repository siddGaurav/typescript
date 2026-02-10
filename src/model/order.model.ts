import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db.js";
import { User } from "./user.model.js";

<<<<<<< HEAD
// ✅ Corrected TypeScript interface
=======
>>>>>>> 14517d659aaf62f7cd84f27eff603630d000d39e
interface OrderAttributes {
    id?: number;
    user_id: number;
    order_txn_id: string;
<<<<<<< HEAD
     order_total_amount: number;
    order_tax_amount: number;
    order_totalItems: number;
    order_discount_amount: number;
    order_coupon_code?: string | null;
    order_payment_mode: "COD" | "ONLINE";
    order_status: "pending" | "confirmed" | "refunded" | "cancelled";
=======
    order_total_amount: number;
    order_tax_amount: number;
    order_totalItems: number;
    order_discount_amount: number;
    order_coupon_code: string;
    order_payment_mode: "pending" | "completed" | "failed" | "refunded";
    order_status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
>>>>>>> 14517d659aaf62f7cd84f27eff603630d000d39e
    order_address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    phoneNumber: string;
<<<<<<< HEAD
    notes?: string | null;
=======
    notes?: string;
>>>>>>> 14517d659aaf62f7cd84f27eff603630d000d39e
    createdAt?: Date;
    updatedAt?: Date;
}

export class Order extends Model<OrderAttributes> implements OrderAttributes {
    public id!: number;
    public user_id!: number;
    public order_txn_id!: string;
    public order_totalItems!: number;
    public order_total_amount!: number;
    public order_tax_amount!: number;
    public order_discount_amount!: number;
<<<<<<< HEAD
    public order_coupon_code?: string | null;
=======
    public order_coupon_code!: string;
>>>>>>> 14517d659aaf62f7cd84f27eff603630d000d39e
    public city!: string;
    public state!: string;
    public zipCode!: string;
    public country!: string;
    public phoneNumber!: string;
<<<<<<< HEAD
    public order_payment_mode!: "COD" | "ONLINE";
    public order_status!: "pending" | "confirmed" | "refunded" | "cancelled";
    public order_address!: string;
    public notes?: string | null;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Order.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        order_txn_id: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        order_total_amount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        order_totalItems: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        order_tax_amount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        order_discount_amount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 0,
        },
        order_coupon_code: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        city: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        state: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        zipCode: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        country: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        phoneNumber: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        notes: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        order_payment_mode: {
            type: DataTypes.ENUM("COD", "ONLINE"),
            allowNull: false,
            defaultValue: "COD", // ✅ fixed
        },
        order_status: {
            type: DataTypes.ENUM("pending", "confirmed", "refunded", "cancelled"),
            allowNull: false,
            defaultValue: "pending", // ✅ fixed
        },
        order_address: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: "orders",
        modelName: "Order",
        timestamps: true,
    }
);

// ✅ Association
Order.belongsTo(User, { foreignKey: "user_id", as: "user", targetKey: "id" });
=======
    public order_payment_mode!: "pending" | "completed" | "failed" | "refunded";
    public order_status!: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";

    public order_address!: string;
    public notes?: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}
Order.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    user_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
    order_txn_id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    order_total_amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    order_totalItems: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
    order_tax_amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    order_discount_amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0,
    },
    order_coupon_code: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    city: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    state: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    zipCode: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    country: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    phoneNumber: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },

    notes: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    order_payment_mode: {
        type: DataTypes.ENUM("pending", "completed", "failed", "refunded"),
        allowNull: false,
        defaultValue: "pending",
    },
    order_status: {
        type: DataTypes.ENUM("pending", "confirmed", "shipped", "delivered", "cancelled"),
        allowNull: false,
        defaultValue: "pending",
    },
    order_address: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
}, {
    sequelize,
    tableName: "orders",
    modelName: "Order",
    timestamps: true,
});

Order.belongsTo(User, { foreignKey: "user_id", as: "user", targetKey: "id" })



>>>>>>> 14517d659aaf62f7cd84f27eff603630d000d39e
