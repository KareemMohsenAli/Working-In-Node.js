import mongoose from "mongoose";
const connectDB = async () => {
  return await mongoose
    .connect(`mongodb://localhost:27017/assignment5`)
    .then((result) => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.log(`error connecting to MongoDB`, err);
    });
};
export default connectDB;
