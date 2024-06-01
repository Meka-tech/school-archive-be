const express = require("express");

const detailController = require("../controllers/financeDetail");

const router = express.Router();

router.post("/", detailController.createFinanceDetail);

router.put("/:id", detailController.updateFinanceDetail);

router.delete("/:id", detailController.deleteFinanceDetail);

module.exports = router;
