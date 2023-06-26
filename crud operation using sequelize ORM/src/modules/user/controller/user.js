import { Op } from "sequelize";
import userModel from "../../../../DB/userModel.js";

const getuser = async (req, res) => {
  const users = await userModel.findAll();
  res.json({ message: "done", users });
};
const adduser = async (req, res) => {
  try {
    const emailExist = await userModel.findOne({
      where: { email: req.body.email },
    });
    if (emailExist) {
      return res.json({ message: "email is already exist" });
    }
    const adduser = await userModel.create(req.body);
    res.json({ message: "done", adduser });
  } catch (error) {
    res.json({ error });
  }
};
const updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const userupdate = await userModel.update(req.body, {
      where: {
        id: userId,
      },
    });
    if (userupdate > 0) {
      return res.json({ message: "user is successffully updated" });
    } else {
      return res.json({ message: "user doesnt exist" });
    }
  } catch (error) {
    return res.json(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const userdeleted = await userModel.destroy({
      where: {
        id: userId,
      },
    });
    if (userdeleted > 0) {
      return res.json({ message: "user is successffully deleted" });
    } else {
      return res.json({ message: "user doesnt exist" });
    }
  } catch (error) {
    return res.json(error);
  }
};
const searchForSpecificUser = async (req, res) => {
  try {
    const searchForSpecificUser = await userModel.findAll({
      where: {
        userName: { [Op.startsWith]: "a" },
        age: { [Op.lt]: 30 },
      },
    });
    if (searchForSpecificUser.length > 0) {
      return res.json({ searchForSpecificUser });
    } else {
      return res.json({ message: "search result doesnt exist" });
    }
  } catch (error) {
    return res.json({ message: error });
  }
};
const searchForAge = async (req, res) => {
  try {
    const searchForUserAge = await userModel.findAll({
      where: {
        age: { [Op.between]: [20, 30] },
      },
    });
    // i used query.lenght beacause rest for search using between comes as array of objects
    if (searchForUserAge.length > 0) {
      return res.json({ searchForUserAge });
    } else {
      return res.json({ message: "search result doesnt exist" });
    }
  } catch (error) {
    return res.json({ message: error });
  }
};
const searchForMaxAge = async (req, res) => {
  try {
    const oldestUsers = await userModel.findAll({
      where: {
        age: { [Op.ne]: null },
      },
      order: [["age", "DESC"]],
      limit: 3,
    });
    if (oldestUsers.length > 0) {
      return res.json({ oldestUsers });
    } else {
      return res.json({ message: "No users found" });
    }
  } catch (error) {
    return res.json({ message: error });
  }
};
const searchForIds = async (req, res) => {
  const userId = req.query.ids.split(",");
  console.log(userId);
  const searchForUsersIds = await userModel.findAll({
    where: {
      id: { [Op.in]: userId },
    },
  });
  if (searchForUsersIds.length > 0) {
    return res.json({ searchForUsersIds });
  } else {
    return res.json({ message: "users Ids are not exist" });
  }
};

export {
  getuser,
  adduser,
  updateUser,
  deleteUser,
  searchForSpecificUser,
  searchForAge,
  searchForMaxAge,
  searchForIds,
};
