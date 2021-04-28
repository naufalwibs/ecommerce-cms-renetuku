'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class History extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      History.belongsTo(models.User, { foreignKey: "UserId" })
    }
  };
  History.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    purchaseDate: DataTypes.STRING,
    transactionCode: DataTypes.STRING,
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
    totalItem: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Item can't be empty"
        },
        min: {
          args: 1,
          msg: ["Cart can't be empty"]
        }
      }
    },
    totalPrice: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Item can't be empty"
        },
        min: {
          args: 1,
          msg: ["Cart can't be empty"]
        }
      }
    }
  }, {
    sequelize,
    modelName: 'History',
  });
  return History;
};