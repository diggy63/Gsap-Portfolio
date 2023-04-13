const express = require("express");
const router = express.Router();
const exCtrl = require("../../controllers/ExerciseController");

router.get("/get", exCtrl.testApi)
router.post("/find", exCtrl.basicSearch)
router.get("/dbFill", exCtrl.dbFill)


module.exports = router;