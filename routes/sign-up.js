var express = require("express");
var router = express.Router();
const user_controller = require("../controllers/userController");
const message_controller = require("../controllers/messageController");

router.get("/signup", user_controller.signup_get);
router.post("/signup", user_controller.signup_post);

module.exports = router;
