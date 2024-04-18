const router = require("express").Router();

// Controller
const {
  registerUser,
  loginUser,
  logoutUser
} = require("../controller/userController");

router.post("/signup", registerUser);
router.post("/logout", logoutUser);
router.route("/login").post(loginUser);
module.exports = router;