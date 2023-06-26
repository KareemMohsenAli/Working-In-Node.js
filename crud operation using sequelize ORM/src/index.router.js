import userRouter from "./modules/user/user.router.js";
import productRouter from "./modules/product/product.router.js";
import { connectDB } from "../DB/dbConnection.js";

const bootstrap = (app, express) => {
  connectDB();
  app.use(express.json());
  app.use("/user", userRouter);
  app.use("/product", productRouter);
  app.use("*", (req, res) => {
    return res.json({ message: "In-valid Routing" });
  });
};
export default bootstrap;
