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
      Spot.hasMany(
        models.Review,
        {foreignKey: 'spotId'}
      )
      Spot.hasMany(
        models.Booking,
        {foreignKey: 'spotId'}
      )
      Spot.hasMany(
        models.SpotImage,
        {foreignKey: 'spotId'}
      )
      Spot.belongsTo(
        models.User,
        {foreignKey: 'ownerId'}
      )
    }
  }
  Spot.init({
    ownerId: DataTypes.INTEGER,
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Street address is required'
        }
      }
    },
    city: {
      type: DataTypes.STRING,
      allowNull:false,
      validate: {
        notNull: {
          msg: "City is required"
        }
      }
    },
    state: {
      type: DataTypes.STRING,
      allowNull:false,
      validate: {
        notNull: {
          msg: "State is required"
        }
      }
    },
    country: {
      type: DataTypes.STRING,
      allowNull:false,
      validate: {
        notNull: {
          msg: "Country is required"
        }
      }
    },
    lat: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        notNull: {
          msg:"Latitude is not valid"
        },
        checkForDecimal(value){
          if(value % 1 === 0){
              throw new Error('Latitude is not valid')
          }
        }
      }
    },
    lng: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        notNull: {
          msg:"Longitude is not valid"
        },
        checkForDecimal(value){
          if(value % 1 === 0){
              throw new Error('Longitude is not valid')
          }
        }
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        len: {
          args: [1,50],
          msg: "Name must be less than 50 characters"
        }
      }
    },
    description: {
      type: DataTypes.STRING(2000),
      allowNull:false,
      validate: {
        notNull: {
          msg: "Description is required"
        }
      }
    },
    price:{
      type: DataTypes.FLOAT,
      allowNull:false,
      validate: {
        notNull: {
          msg: "Price per day is required"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};
