const express = require('express');
const milestoneController = require("../../controllers/milestoneController");
const router = express.Router();

router.get("/", milestoneController.getMilestone);

router.post("/", milestoneController.insertMilestone);

router.put("/", milestoneController.updateMilestone);

router.delete("/", milestoneController.deleteMilestone);

router.put("/status", milestoneController.updateMilestoneStatus);

module.exports = router;
