import { DataTypes } from "sequelize";
import { sequelize } from "./dbConnection.js";
import productModel from "./productModel.js";

const userModel = sequelize.define("User", {
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(200),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  confirmEmail: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  age: { type: DataTypes.INTEGER },
});
userModel.hasMany(productModel,{
    onDelete: 'cascade',
    onUpdate: 'cascade'
  })
  productModel.belongsTo(userModel)

export default userModel;
