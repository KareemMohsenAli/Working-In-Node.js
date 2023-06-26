import { Router } from "express";
import * as userController from './controller/user.js'
const router=Router();
router.get('/getusers', userController.getuser)
router.post('/adduser', userController.adduser)
router.put('/updateuser/:userId', userController.updateUser)
router.delete('/deleteuser/:userId', userController.deleteUser)
router.get('/searchforuser', userController.searchForSpecificUser)
router.get('/searchforage', userController.searchForAge)
router.get('/searchformaxage', userController.searchForMaxAge)
router.get('/usersIds', userController.searchForIds)

export default router