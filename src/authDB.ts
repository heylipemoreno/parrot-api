import "dotenv/config";

export const authDB = {
    host: process.env.DB_HOST as string,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME as string,
    username: process.env.DB_USER as string,
    password: process.env.DB_PASS as string,
    dialect: "mysql",
};

module.exports = authDB;