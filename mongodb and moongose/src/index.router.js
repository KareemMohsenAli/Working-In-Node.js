import userRouter from "./modules/user/users.router.js";
import postRouter from "./modules/post/posts.router.js";
import connectDB from "../DB/connection.js";
import notesRouter from "./modules/notes/notes.router.js"
const bootstrap = (app, express) => {
  app.use(express.json());
  connectDB();
  app.use("/user", userRouter);
  app.use("/note",notesRouter);
  app.use("/post", postRouter);
  app.use("*", (req, res, next) => {
    return res.json({ message: "In-valid Routing" });
  });
};
export default bootstrap;
