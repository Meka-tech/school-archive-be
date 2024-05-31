const express = require("express");

const termController = require("../controllers/term");

const router = express.Router();

router.post("/", termController.createTerm);

router.delete("/:id", termController.deleteTerm);

//Staff data

router.put("/staff-data/:id", termController.postStaffData);

router.put("/staff-data/update/:id", termController.updateStaffData);

router.delete("/staff-data/:id", termController.deleteStaffData);

///class

router.put("/class/:id", termController.postClass);

router.put("/class/update/:id", termController.updateClass);

router.delete("/class/:id", termController.deleteClass);

///staff

router.put("/staff/:id", termController.postStaff);

router.put("/staff/update/:id", termController.updateStaff);

router.delete("/staff/:id", termController.deleteStaff);

module.exports = router;
