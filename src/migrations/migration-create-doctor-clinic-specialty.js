'use strict';
module.exports = {
    // Hàm up: create table, down: drop table
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('doctor-clicnic-specialty', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            clinicId: {
                type: Sequelize.INTEGER
            },
            doctorID: {
                type: Sequelize.INTEGER
            },
            specialtyId: {
                type: Sequelize.INTEGER
            },

            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('doctor-clicnic-specialty');
    }
};