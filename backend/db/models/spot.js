'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Spot.belongsTo(models.User, {
        foreignKey: 'ownerId',
        as: 'Owner'
      })

      Spot.hasMany(models.Image, {
        foreignKey: 'spotId',
        as: 'SpotImages',
        onDelete: 'CASCADE',
        hooks: true
      })

      Spot.hasMany(models.Review, {
        foreignKey: 'spotId',
        onDelete: 'CASCADE',
        hooks: true
      })

      Spot.hasMany(models.Booking, {
        foreignKey: 'spotId',
        onDelete: 'CASCADE',
        hooks: true
      })

      // Spot.belongsToMany(models.User, {through: models.Booking})
    }
  }
  Spot.init({
    ownerId: {
      type: DataTypes.INTEGER
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull:false
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false
    },
    country: {
      type: DataTypes.STRING,
      allowNull:false
    },
    lat: {
      type: DataTypes.DECIMAL,
      validate: {
        isNumeric:true
      }
    },
    lng: {
      type: DataTypes.DECIMAL,
      validate: {
        isNumeric: true
      }
    },
    name: {
      type: DataTypes.STRING,
      validate: {
        len: [1, 50]
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull:false
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull:false
    },
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};
