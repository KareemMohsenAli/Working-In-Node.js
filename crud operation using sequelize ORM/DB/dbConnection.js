import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("sequelize", "root", "", {
  dialect: "mysql",
});

export const connectDB = async () => {
  return await sequelize
    .sync({alter:false}).then(() => {
      console.log("Connect");
    })
    .catch((error) => {
      console.log(error);
    });
};
