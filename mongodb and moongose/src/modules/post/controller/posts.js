import postModel from "../../../../DB/models/PostModel.js";
import userModel from "../../../../DB/models/User.model.js";
import noteModel from "../../../../DB/models/noteModel.js";

const addPost = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { title, content } = req.body;
    const IDIsExist = await userModel.findById(userId);
    if (!IDIsExist) {
      res.json({ message: "user not found" });
    }
    const addPost = await postModel.create({
      title: title,
      content: content,
      author: userId,
    });
    res.json({ message: "post added successfully", addPost });
  } catch (error) {
    res.json({ error });
  }
};

const deletePost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const { userId } = req.body;
    // Find the post by ID
    const post = await postModel.findOneAndDelete({
      _id: postId,
      author: userId,
    });

    if (!post) {
      return res
        .status(404)
        .json({ message: "Post not found or you are not authorized" });
    }

    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    res.json({ error });
  }
};

const updatePost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const { userId, title, content } = req.body;
    const post = await postModel.findById(postId);

    if (!post) {
      return res.json({ message: "Post not found" });
    }

    // Check if the post's author matches the authenticated user
    if (post.author.toString() !== userId) {
      return res.json({
        message: "You are not authorized to update this post",
      });
    }

    // Update the post
    post.title = title;
    post.content = content;
    await post.save();
    res.json({ message: "Post updated successfully", post });
  } catch (error) {
    res.json({ error: "Server error" });
  }
};
////////////////////////////////////////////////////////notes functions
const getNotes = async (req, res) => {
  const notes = await noteModel.find();
  res.json({ notes });
};

const getAllNotesWithOwners = async (req, res) => {
  try {
    const notes = await noteModel.find().populate("userId", "-password");

    if (!notes) {
      return res.status(404).json({ message: "No notes found" });
    }

    res.json({ notes });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
const getAllNotesSortedByDate= async (req, res) => {
    try {
      const notes = await noteModel.find().sort({ createdAt: -1 });
  
      if (!notes) {
        return res.json({ message: 'No notes found' });
      }
  
      res.json({ notes });
    } catch (error) {
      res.json({ error: 'Server error' });
    }
  };



export { addPost, deletePost, updatePost, getNotes ,getAllNotesWithOwners,getAllNotesSortedByDate};
