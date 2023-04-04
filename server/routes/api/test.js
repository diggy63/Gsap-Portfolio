const express = require("express");
const router = express.Router();
const testCtrl = require("../../controllers/TestController");

router.get("/test", testCtrl.testApi)


module.exports = router;