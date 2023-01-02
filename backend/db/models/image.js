'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static associate(models) {
      // define association here
      Image.belongsTo(models.Spot, {
        foreignKey: 'spotId'
      })

      Image.belongsTo(models.Review, {
        foreignKey: 'reviewId'
      })
    }
  }
  Image.init({
    spotId: {
      type: DataTypes.INTEGER
    },
    reviewId: {
      type: DataTypes.INTEGER
    },
    url: {
      type: DataTypes.STRING,
      allowNull:false
    },
    preview: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Image',
  });
  return Image;
};
