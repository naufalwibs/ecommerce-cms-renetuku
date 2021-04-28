'use strict';
const { hashPassword } = require("../helpers/bcrypt")

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Product, { foreignKey : "UserId" });
      User.hasMany(models.Banner, { foreignKey : "UserId" });
      User.hasMany(models.History, { foreignKey: "UserId" })
      User.belongsToMany(models.Product, {
        through: models.Cart
      })
      User.hasMany(models.Cart);
      User.belongsToMany(models.Product, {
        through: models.Wishlist
      })
      User.hasMany(models.Wishlist)
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          args: false,
          msg: "Please insert only email format"
        },
        notEmpty: {
          args: true,
          msg: "Email can't be empty"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Password can't be empty"
        }
      }
    },
    role: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: ((instance, option) => {
        instance.password = hashPassword(instance.password);
        instance.role = 'customer'
      })
    }
  });
  return User;
};