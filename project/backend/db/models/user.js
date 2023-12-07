'use strict';

const { Model, Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
      User.hasMany(
        models.Spot,
        {foreignKey: 'ownerId'}
      )
      User.hasMany(
        models.Booking,
        {foreignKey: 'userId'}
      )
      User.hasMany(
        models.Review,
        {foreignKey: 'userId'}
      )
    }
  };

  User.init({
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "User with that username already exists"
        },
        validate: {
          len: [4, 30],
          notNull: {
              msg: "Username is required"
          },
          isNotEmail(value) {
            if (Validator.isEmail(value)) {
              throw new Error("Cannot be an email.");
            }
          }
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "User with that email already exists"
        },
        validate: {
          len: [3, 256],
          isEmail: {
            msg: "Invalid email"
          },
          notNull: {
            msg: "Email is required"
          }
        }
      },
      hashedPassword: {
        type: DataTypes.STRING.BINARY,
        allowNull: false,
        validate: {
          len: [60, 60]
        }
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "First Name is required"
          }
        }
      },
      lastName:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Last Name is required"
          }
        }
      },
    }, {
      sequelize,
      modelName: 'User',
      defaultScope: {
        attributes: {
          exclude: ["hashedPassword", "email", "createdAt", "updatedAt"]
        }
      }
    }
  );
  return User;
};
