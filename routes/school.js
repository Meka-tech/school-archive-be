const express = require("express");

const schoolController = require("../controllers/school");

const router = express.Router();

router.get("/search", schoolController.searchSchoolsByName);
router.get("/:id", schoolController.getSchoolById);
router.post("/", schoolController.createSchool);
router.put("/:id", schoolController.updateSchool);
router.delete("/:id", schoolController.deleteSchool);

module.exports = router;
