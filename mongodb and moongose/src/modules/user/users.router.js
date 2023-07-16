import * as userController from "./controller/users.js";
import * as notesController from "../notes/controller/notes.js";
import { Router } from "express";
const router = Router();
router.post("/signup", userController.signUp);
router.post("/login", userController.logIn);
router.put("/updateuser/:userId", userController.updateUser);
router.delete("/deleteuser/:userId", userController.deleteUser);
router.get("/searchforuser", userController.searchUsers);
router.get("/searchforuserage", userController.searchUsersAge);
router.get("/getusers", userController.getUsers);
//////////////////////////////////////////////////////////note routes
router.get("/getnotes", notesController.getNotes); //extra/////////////////////////
router.post("/addnote/:userId", notesController.addNote); //extra/////////////////////
router.get("/getnotesowners/:userId", notesController.getNotesOwner);

export default router;
