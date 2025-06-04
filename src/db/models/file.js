"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class File extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      File.hasMany(models.Download, {
        foreignKey: "fileId",
        onDelete: "CASCADE",
      });
    }
  }
  File.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      token: DataTypes.STRING,
      code: DataTypes.STRING,
      filename: DataTypes.STRING,
      original: DataTypes.STRING,
      note: DataTypes.TEXT,
      recipientEmail: DataTypes.STRING,
      password: DataTypes.STRING, // Field baru untuk password
      expiresAt: DataTypes.DATE,
      downloaded: DataTypes.BOOLEAN,
      ip: DataTypes.STRING,
      ua: DataTypes.STRING,
      refer: DataTypes.STRING,
      origin: DataTypes.STRING,
      lang: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "File",
    }
  );
  return File;
};
