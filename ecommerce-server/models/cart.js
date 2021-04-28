'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cart.belongsTo(models.User);
      Cart.belongsTo(models.Product);
    }
  };
  Cart.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    UserId: {
      type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'Users'
        },
        key: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    },
    ProductId: {
      type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'Products'
        },
        key: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    },
    quantity: {
      type: DataTypes.INTEGER,
      validate: {
        min: {
          args: 1,
          msg: ["Item can't below 1"]
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Cart',
    hooks: {
      beforeCreate: ((instance, option) => {
        instance.quantity = 1
      })
    }
  });
  return Cart;
};