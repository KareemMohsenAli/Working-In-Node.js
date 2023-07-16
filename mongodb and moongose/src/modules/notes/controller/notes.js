import userModel from "../../../../DB/models/User.model.js";
import noteModel from "../../../../DB/models/noteModel.js";
////////////////////////////////////////////////////for user model////////////////////////////////
const addNote = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { title, description } = req.body;
    const note = await noteModel.create({ title, description, userId });
    // Find the user by ID
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Associate the note with the user
    user.notes.push(note._id);
    await user.save();

    res.json({ message: "Note added successfully" });
  } catch (error) {
    return res.json({ error });
  }
};
const getNotes = async (req, res) => {
  const notes = await noteModel.find();
  res.json({ notes });
};

const getNotesOwner = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await userModel.findById(userId).populate([{ path: "notes" }]);
    if (!user) {
      return res.json({ message: "User not found" });
    }
    // const notes = user.notes;
    return res.json({ user });
  } catch (error) {
    return res.json({ error });
  }
};
export { getNotes, addNote, getNotesOwner };
/////////////////////////////////////////////////////////////////////////////////////////////////////
