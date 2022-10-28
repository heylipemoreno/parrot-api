import { QueryInterface, DataTypes } from "sequelize";

export default {
    up: (queryInterface: QueryInterface) => {
        return queryInterface.bulkInsert ("user", [
            {
                nome: "Teste",
                email: "teste@gmail.com",
                apartment: 1,
                senha: "teste1",
                created_at: new Date(Date.now()),
                updated_at: new Date(Date.now()),
            },
        ]);
    },

    down: (queryInterface: QueryInterface) => {
        return queryInterface.bulkDelete ("user", {}, {});
    },
};
