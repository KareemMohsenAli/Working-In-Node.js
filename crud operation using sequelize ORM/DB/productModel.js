import { DataTypes } from "sequelize";
import { sequelize } from "./dbConnection.js";
import userModel from "./userModel.js";

 const productModel=sequelize.define('Product',{
    productName:{
        type:DataTypes.STRING,
        allowNull:false,
    }, productPrice:{
        type:DataTypes.FLOAT,
        defaultValue: 10.00,
    },
    productDescription:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    productCategory:{
        type:DataTypes.STRING,
        allowNull:false,
    }

})

productModel
export default productModel