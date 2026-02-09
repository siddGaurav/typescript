import dotenv from "dotenv";
import { Sequelize } from "sequelize";
dotenv.config();
export const sequelize = new Sequelize(
    process.env.DB_NAME!,
    process.env.DB_USER!,
    process.env.DB_PASS!,
    {
        host: process.env.DB_HOST!,
        port: Number(process.env.DB_PORT),
        dialect: `${process.env.DB_DIALECT!}` as any,
        logging: false,
    }
);

async function testDB() {
    try {
        await sequelize.authenticate();
        console.log("✅ Database connection successful!");
        const isProd = process.env.NODE_ENV === 'production';
        // console.log("Environment:", isProd);
        // // In development we use alter to synchronize model changes without dropping data
        await sequelize.sync({ alter: false });
        //await sequelize.sync({ force: true }); // {force:true} {alter:true} apply only development mode
        console.log("✅ Models synced");
    } catch (error) {
        console.error("❌ Unable to connect to the database:", error);
    }
}
testDB();