'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Banner extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Banner.belongsTo(models.User, {foreignKey: "UserId" })
    }
  };
  Banner.init({
    banner_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: {
          args: false,
          msg: "Can only insert url format"
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
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Status can't be empty"
        }
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: "Users"
        },
        key: "id"
      },
      onUpdate: "cascade",
      onDelete: "cascade"
    }
  }, {
    sequelize,
    modelName: 'Banner',
  });
  return Banner;
};