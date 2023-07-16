import { Schema, model,Types } from "mongoose";
const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    phone: {
      type: String
    },

    gender: {
      type: String,
      enum: ["male", "female"],
    },
    age: Number,
    notes: [{ type:Types.ObjectId, ref: 'Note' ,required: true }],
  },
  {
    timestamps: true,
  }
);
const userModel = model("User", userSchema);
export default userModel;
