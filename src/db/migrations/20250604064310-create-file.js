'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Files', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      token: {
        type: Sequelize.STRING,
      },
      code: {
        type: Sequelize.STRING,
      },
      filename: {
        type: Sequelize.STRING,
      },
      original: {
        type: Sequelize.STRING,
      },
      note: {
        type: Sequelize.TEXT,
      },
      recipientEmail: {
        type: Sequelize.STRING,
      },
      expiresAt: {
        type: Sequelize.DATE,
      },
      downloaded: {
        type: Sequelize.BOOLEAN,
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
    await queryInterface.dropTable('Files');
  },
};
