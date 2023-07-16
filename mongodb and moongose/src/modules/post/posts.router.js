import * as postContoller from "./controller/posts.js"
import { Router } from "express";
const router= Router()
router.post("/addpost/:userId", postContoller.addPost);
router.delete("/deletepost/:postId", postContoller.deletePost);
router.put("/updatepost/:postId", postContoller.updatePost);
router.get('/getnotes',postContoller.getNotes)
router.get('/getallnoteswithowners',postContoller.getAllNotesWithOwners)
router.get('/getallnotesSortedbydate',postContoller.getAllNotesSortedByDate)



export default router;
