const express = require('express');
const router = express.Router();
const { registerUser, loginUserValidation, uploadImage, verifyAdminLogin, accessUserData , deleteUser , editUser } = require('../CONTROLLER/controller');
const { verifyToken } = require("../MIDDLEWARE/authMiddleware");
const multer = require('multer');

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.post("/signup", registerUser);
router.post("/", loginUserValidation);
router.post("/userhome", verifyToken, upload.single('image'), uploadImage);
router.post("/admin", verifyAdminLogin);
router.get("/adminhome", accessUserData);
router.post("/adminhome/deleteuser",deleteUser);
router.post("/adminhome/edituser",editUser)

module.exports = router;
