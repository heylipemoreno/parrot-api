import { QueryInterface, DataTypes } from 'sequelize'

export default {
    up: (queryInterface: QueryInterface) => {
        return queryInterface.createTable ("user", {
            idUser: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },

            nome: {
                type: DataTypes.STRING(70),
            },

            email: {
                type: DataTypes.STRING(45),
            },

            senha: {
                type: DataTypes.STRING(120),
            },

            created_at: {
                type: DataTypes.DATE,
            },

            updated_at: {
                type: DataTypes.DATE,
            },
        });
    },

    down: (queryInterface: QueryInterface) => {
        return queryInterface.dropTable ("user",);
    },
};