var express = require("express");
var router = express.Router();
const user_controller = require("../controllers/userController");
const message_controller = require("../controllers/messageController");

router.get("/", user_controller.index);
router.get("/log-out", user_controller.logout_get);
router.post("/", user_controller.log_in);
router.post("/addmessage", message_controller.add_message);
router.post("/deletemessage", message_controller.delete_message_post);

module.exports = router;
