'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.User, { foreignKey : 'UserId' })
      Product.belongsToMany(models.User, {
        through: models.Cart
      })
      Product.hasMany(models.Cart)
      Product.belongsToMany(models.User, {
        through: models.Wishlist
      })
      Product.hasMany(models.Wishlist)
    }
  };
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Product name can't be empty"
        }
      }
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Category can't be empty"
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Stock can't be empty"
        },
        isInt: {
          args: false,
          msg: "Can only insert valid value / greater than 0"
        },
        isGreaterThanZero(stock) {
          if (stock < 0) {
            throw new Error("Can only insert valid value / greater than equal 0")
          }
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Price can't be empty"
        },
        isInt: {
          args: false,
          msg: "Can only insert valid value / greater than 0"
        },
        isGreaterThanZero(stock) {
          if (stock < 0) {
            throw new Error("Can only insert valid value / greater than equal 0")
          }
        }
      }
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: {
          args: false,
          msg: "Can only insert url format"
        }
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: 'Users'
        },
        key: 'id',
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};