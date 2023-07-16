import userModel from "../../../../DB/models/User.model.js";

const signUp = async (req, res) => {
  try {
    const { userName, password, cPassword, email, phone, gender, age } =
      req.body;

    if (password != cPassword) {
      return res.json({ message: "password does not match" });
    }
    const EmailIsExist = await userModel.findOne({ email: email });
    if (EmailIsExist) {
      return res.json({ message: "email is already exist " });
    }
    const addUser = await userModel.create({
      userName,
      password,
      cPassword,
      email,
      phone,
      gender,
      age,
    });
    res.json({ message: "user added successfully", addUser });
  } catch (error) {
    return res.json({ error });
  }
};
const logIn = async (req, res, next) => {
  try {
    const { emailOrUsernameOrPhone, password } = req.body;
    const EmailPasswordExist = await userModel.findOne({
      $or: [
        { email: emailOrUsernameOrPhone },
        { userName: emailOrUsernameOrPhone },
        { phone: emailOrUsernameOrPhone },
      ],
    });
    if (EmailPasswordExist && EmailPasswordExist.password === password) {
      res.json({ message: "Done!!" });
    } else {
      res.json({ message: "in-Valid email or password" });
    }
  } catch (error) {
    res.json({ error });
  }
};
const updateUser = async (req, res) => {
  const { userName, email, password } = req.body;
  const userId = req.params.userId;
  const updatedUser = await userModel.findByIdAndUpdate(
    userId,
    { userName, email, password },
    {
      new: true,
    }
  );

  if (!updatedUser) {
    // User with the provided userId was not found
    return res.json({ message: "User not found" });
  }
  res.json({ message: "User updated successfully", user: updatedUser });
};

const deleteUser = async (req, res) => {
  const userId = req.params.userId;
  const deletedUser = await userModel.findByIdAndDelete(userId, {
    new: true,
  });

  if (!deletedUser) {
    return res.json({ message: "User not found" });
  }
  res.json({ message: "User deleted successfully", user: deletedUser });
};
const searchUsers = async (req, res) => {
  try {
    const { X, Y } = req.body;
    const regexPattern = `^${X}`; // regex start with the variable that comes from frontend

    const users = await userModel.find({
      userName: { $regex: new RegExp(regexPattern, "i") }, // Use regex to match names starting with X ,"i"=>case insensitive
      age: { $lt: Y }, // Match users with age less than Y
    });

    res.json({ users });
  } catch (error) {
    res.json({ error });
  }
};
const searchUsersAge = async (req, res) => {
  const { X, Y } = req.body;

  try {
    const users = await userModel.find({
      age: { $gte: X, $lte: Y }, // Match users with age between X and Y (inclusive)
    });

    res.json({ users });
  } catch (error) {
    res.json({ error });
  }
};
const getUsers = async (req, res) => {
  const users = await userModel.find();
  res.json({ users });
};

export {
  signUp,
  logIn,
  updateUser,
  deleteUser,
  searchUsers,
  searchUsersAge,
  getUsers,
};
