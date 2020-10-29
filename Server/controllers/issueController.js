import issueDao from "../dao/issueDao";

/* 모든 이슈 조회 */
exports.getAllIssues = async function (req, res, next) {
  try {
    const allIssues = await issueDao.getAllIssues();
    if(allIssues.success){
      return res.status(200).json({
        success: true,
        allIssues
      });
    }
    return res.status(400).json({
      success: false,
      allIssues
    })
  } catch (e) {
    return res
      .status(400)
      .json({ success: false, status: 400, message: e.message });
  }
};

/* 이슈 상세 페이지 조회 */
exports.getIssueDetail = async function (req, res, next) {
  const issueId = req.params.issueId;
  try {
    const issueDetail = await issueDao.getIssueDetail(issueId);
    if(issueDetail.success){
      return res.status(200).json({
        success:true,
        issueDetail
      });
    }
    return res.status(400).json({
      success:false,
      issueDetail
    })
  } catch (e) {
    return res
      .status(400)
      .json({ success: false, status: 400, message: e.message });
  }
};

/* 새로운 이슈 생성 */
exports.insertNewIssue = async function (req, res, next) {
  const {
    title,
    authorId,
    description,
    milestoneId,
    assignees,
    labels,
  } = req.body;
  try {
    const newIssue = await issueDao.insertNewIssue(authorId,milestoneId,title,description,assignees,labels);
    if(newIssue.success){
      return res.status(200).json({success:true});
    }
    return res.status(400).json(newIssue);
  } catch (e) {
    return res
      .status(400)
      .json({ success: false, status: 400, message: e.message });
  }
};

/* 이슈 수정 - 제목 */
exports.updateIssueTitle = async function (req, res, next) {
  const { issueId, title, authorId } = req.body;
  try {
    let updateIssue = await issueDao.updateIssueTitle(title,authorId,issueId);
    if(updateIssue.success){
      return res.status(200).json({success:true});
    }
    return res.status(400).json(updateIssue);
  } catch (e) {
    return res
      .status(400)
      .json({ success: false, status: 400, message: e.message });
  }
};

/* 이슈 수정 - 내용 */
exports.updateIssueDescription = async function (req, res, next) {
  const { issueId, description, authorId } = req.body;
  try {
    let updateIssue = await issueDao.updateIssueDescription(description, authorId, issueId);
    if(updateIssue.success){
      return res.status(200).json({success:true});
    }
    return res.status(400).json(updateIssue);
  } catch (e) {
    return res
      .status(400)
      .json({ success: false, status: 400, message: e.message });
  }
};

/* 이슈 수정- status */
exports.updateIssueStatus = async function (req, res, next) {
  const { issueId, newStatus, userId } = req.body;
  try {
    let updatedStatus = await issueDao.updateIssueStatus(newStatus,userId,issueId);
    if(updatedStatus.success){
      return res.status(200).json({success:true});
    }
    return res.status(400).json(updatedStatus);
  } catch (e) {
    return res
      .status(400)
      .json({ success: false, status: 400, message: e.message });
  }
};

/* 이슈에 라벨 추가 */
exports.insertNewLabel = async function (req, res, next) {
  const { issueId, labelId } = req.body;
  try {
    let insertedLabelResult = await issueDao.insertNewLabel(issueId, labelId);
    if(insertedLabelResult.success){
      return res.status(200).json({success:true});
    }
    return res.status(400).json(insertedLabelResult);
  } catch (e) {
    return res
      .status(400)
      .json({ success: false, status: 400, message: e.message });
  }
};

/* 이슈에 담당자 추가 */
exports.insertNewAssignee = async function (req, res, next) {
  const { issueId, assigneeId } = req.body;
  try {
    let insertAssigneeResult = await issueDao.insertNewAssignee(issueId, assigneeId);
    if(insertAssigneeResult.success){
      return res.status(200).json({success:true});
    }
    return res.status(400).json(insertAssigneeResult);
  } catch (e) {
    return res
      .status(400)
      .json({ success: false, status: 400, message: e.message });
  }
};

/* 이슈에 마일스톤 추가 */
exports.insertNewMilestone = async function (req, res, next) {
  const { issueId, milestoneId } = req.body;
  try {
    let insertMilestoneResult = await issueDao.insertNewMilestone(milestoneId, issueId);
    if(insertMilestoneResult.success){
      return res.status(200).json({success:true});
    }
    return res.status(400).json(insertMilestoneResult);
  } catch (e) {
    return res
      .status(400)
      .json({ success: false, status: 400, message: e.message });
  }
};

/* 이슈 삭제 */
exports.deleteIssue = async function (req, res, next) {
  const { issueId } = req.body;
  try {
    let deleteIssueResult = await issueDao.deleteIssue(issueId);
    if(deleteIssueResult.success){
      return res.status(200).json({success:true});
    }
    return res.status(400).json(deleteIssueResult);
  } catch (e) {
    return res
      .status(400)
      .json({ success: false, status: 400, message: e.message });
  }
};

/* 이슈 filtering - author */
exports.filterIssuesByAuthor = async function (req, res, next) {
  const authorId = req.params.authorId;
  try {
    const issues = await issueDao.filterIssuesByAuthor(authorId);
    if(issues.success){
      return res.status(200).json(issues);
    }
    return res.status(400).json(issues);
  } catch (e) {
    return res
      .status(400)
      .json({ success: false, status: 400, message: e.message });
  }
};

/* 이슈 filtering - label */
exports.filterIssuesByLabel = async function (req, res, next) {
  const labelId = req.params.labelId;
  try {
    const issues = await issueDao.filterIssuesByLabel(labelId);
    if(issues.success){
      return res.status(200).json(issues);
    }
    return res.status(400).json(issues);
  } catch (e) {
    return res
      .status(400)
      .json({ success: false, status: 400, message: e.message });
  }
};

/* 이슈 filtering - milestone */
exports.filterIssuesByMilestone = async function (req, res, next) {
  const milestoneId = req.params.milestoneId;
  try {
    const issues = await issueDao.filterIssuesByMilestone(milestoneId);
    if(issues.success){
      return res.status(200).json(issues);
    }
    return res.status(400).json(issues);
  } catch (e) {
    return res
      .status(400)
      .json({ success: false, status: 400, message: e.message });
  }
};

/* 이슈 filtering - assignee */
exports.filterIssuesByAssignee = async function (req, res, next) {
  const assigneeId = req.params.assigneeId;
  try {
    const issues = await issueDao.filterIssuesByAssignee(assigneeId);
    if(issues.success){
      return res.status(200).json(issues);
    }
    return res.status(400).json(issues);
  } catch (e) {
    return res
      .status(400)
      .json({ success: false, status: 400, message: e.message });
  }
};
