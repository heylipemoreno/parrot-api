import { QueryInterface, DataTypes } from 'sequelize'

export default {
    up: (queryInterface: QueryInterface) => {
        return queryInterface.createTable ("post", {
            idPost: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },

            content: {
                type: DataTypes.TEXT,
            },

            created_at: {
                type: DataTypes.DATE,
            },

            updated_at: {
                type: DataTypes.DATE,
            },

            user_id: {
                type: DataTypes.INTEGER,
            }
        });
    },

    down: (queryInterface: QueryInterface) => {
        return queryInterface.dropTable ("post",);
    },
};