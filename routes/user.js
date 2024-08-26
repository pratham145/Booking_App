const express = require("express");
const { verifyAdmin, verifyToken, verifyUser } = require("../middlewares/auth");

const {deleteUser,updateUser,getUser,getUsers} = require("../Controllers/User");
const router = express.Router();

router.put('/updateuser/:id',verifyUser,updateUser);
router.delete('/deleteuser/:id',verifyUser,deleteUser);
router.post('/getuser/:id',verifyUser,getUser);
router.get('/getalluser',verifyAdmin,getUsers)
module.exports = router;