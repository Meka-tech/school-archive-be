const express = require("express");

const sessionController = require("../controllers/session");

const router = express.Router();

router.post("/", sessionController.createSession);

router.put("/", sessionController.updateSession);

router.delete("/:id", sessionController.deleteSession);

module.exports = router;
