const express = require("express");
const router = express.Router();
const usersCtrl = require("../../controllers/UserController");

router.post("/signup", usersCtrl.signup)
router.post("/login", usersCtrl.login)
router.get("/get", usersCtrl.getUserInfo)


module.exports = router;