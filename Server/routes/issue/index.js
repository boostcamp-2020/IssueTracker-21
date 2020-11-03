const express = require("express");
const router = express.Router();
const issueController = require("../../controllers/issueController");

/* 모든 이슈 조회 */
router.get("/", issueController.getAllIssues);

/* 이슈 상세 페이지 조회 */
router.get("/:issueId", issueController.getIssueDetail);

/* 새로운 이슈 생성 */
router.post("/", issueController.insertNewIssue);

/* 이슈 수정 - 제목 */
router.put("/title", issueController.updateIssueTitle);

/* 이슈 수정 - 내용 */
router.put("/description", issueController.updateIssueDescription);

/* 이슈 수정- status */
router.put("/status", issueController.updateIssueStatus);

/* 이슈에 라벨 추가 */
router.post("/label", issueController.insertNewLabel);

/* 이슈에 담당자 추가 */
router.post("/assignee", issueController.insertNewAssignee);

/* 이슈에 마일스톤 추가 */
router.put("/milestone", issueController.insertNewMilestone);

/* 이슈 삭제 */
router.delete("/", issueController.deleteIssue);

/* 이슈 filtering */
router.get(
  "/filter/author/:authorId/label/:labelId/milestone/:milestoneId/assignee/:assigneeId/filter/:status/commentor/:commentorId",
  issueController.filterIssues
);

/* 이슈 filtering - author */
router.get("/filter/author/:authorId", issueController.filterIssuesByAuthor);

/* 이슈 filtering - label */
router.get("/filter/label/:labelId", issueController.filterIssuesByLabel);

/* 이슈 filtering - milestone */
router.get(
  "/filter/milestone/:milestoneId",
  issueController.filterIssuesByMilestone
);

/* 이슈 filtering - assignee */
router.get(
  "/filter/assignee/:assigneeId",
  issueController.filterIssuesByAssignee
);

/* 이슈 filtering - closed */
router.get("/filter/closed", issueController.filterClosedIssues);

/* 이슈 filtering - opened */
router.get("/filter/opened", issueController.filterOpenedIssues);

/* 이슈 filtering - 특정 유저의 이슈 */
router.get("/filter/user/:userId", issueController.filterUserIssues);

/* 이슈 filtering - 특정 유저가 assignee로 지정된 이슈 */
router.get(
  "/filter/userAssigned/:userId",
  issueController.filterUserAssignedIssue
);

/* 이슈 filtering - commentor */
router.get(
  "/filter/commentor/:commentorId",
  issueController.filterIssuesByCommentor
);

module.exports = router;
