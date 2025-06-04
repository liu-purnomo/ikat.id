'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Download extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Download.belongsTo(models.File, {
        foreignKey: 'fileId',
        onDelete: 'CASCADE',
      });
    }
  }
  Download.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      fileId: DataTypes.UUID,
      ip: DataTypes.STRING,
      ua: DataTypes.STRING,
      refer: DataTypes.STRING,
      origin: DataTypes.STRING,
      lang: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Download',
    }
  );
  return Download;
};
