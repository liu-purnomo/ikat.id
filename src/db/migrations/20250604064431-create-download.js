'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Downloads', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      fileId: {
        type: Sequelize.UUID,
        references: {
          model: 'Files',
          key: 'id',
        },
      },
      ip: {
        type: Sequelize.STRING,
      },
      ua: {
        type: Sequelize.STRING,
      },
      refer: {
        type: Sequelize.STRING,
      },
      origin: {
        type: Sequelize.STRING,
      },
      lang: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Downloads');
  },
};
