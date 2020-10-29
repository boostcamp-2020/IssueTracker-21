const express = require('express');
const milestoneController = require("../../controllers/milestoneController");
const router = express.Router();

/* url 라우팅 */
router.get("/", milestoneController.getMilestone);

router.post("/", milestoneController.insertMilestone);

router.put("/", milestoneController.updateMilestone);

router.delete("/", milestoneController.deleteMilestone);

router.put("/status", milestoneController.updateMilestoneStatus);

module.exports = router;
