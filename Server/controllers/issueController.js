import issueDao from "../dao/issueDao";
import meOrNot from "../utils/meOrNot";
// import {
//   issueFilter,
//   issueFilterUsingSome,
//   issueFilterUsingIncludes,
// } from "../utils/issueFilter";

//localhost:5000/api/issue?is=open&label=Back-End&label=Bug&assignee=2-one-week&author=mingd1023&label=Feature&mentions=me&milestone=BE+개발
/* 모든 이슈 조회 */
exports.getIssues = async function (req, res, next) {
  try {
    const issues = await issueDao.getAllIssues();
    console.log(req.query);
    const {
      isOpened,
      label,
      assignee,
      author,
      commentor,
      milestone,
    } = req.query;

    const authorId = meOrNot(req.user, author);
    const assigneeId = meOrNot(req.user, assignee);
    const commentorId = meOrNot(req.user, commentor);

    if (issues.success) {
      let filteredIssues =
        authorId === undefined
          ? issues.rows
          : issues.rows.filter((e) => e.authorId === authorId);

      filteredIssues =
        isOpened === undefined
          ? filteredIssues
          : filteredIssues.filter((e) => e.isOpened == isOpened);

      filteredIssues =
        milestone === undefined
          ? filteredIssues
          : filteredIssues.filter((e) => e.milestone.title == milestone);

      filteredIssues =
        assigneeId === undefined
          ? filteredIssues
          : filteredIssues.filter((e) =>
              e.users.map((u) => u.id).some((i) => i === assigneeId)
            );

      filteredIssues =
        commentorId === undefined
          ? filteredIssues
          : filteredIssues.filter((e) =>
              e.comments.map((u) => u.authorId).some((i) => i === commentorId)
            );

      console.log(label instanceof Array);

      if (label instanceof Array) {
        filteredIssues =
          label === undefined
            ? filteredIssues
            : filteredIssues.filter((e) =>
                e.labels.map((l) => l.name).includes(...label)
              );
      } else {
        filteredIssues =
          label === undefined
            ? filteredIssues
            : filteredIssues.filter((e) =>
                e.labels.map((l) => l.name).includes(label)
              );
      }

      return res.status(200).json({
        success: true,
        counts: filteredIssues.length,
        issues: filteredIssues,
      });
    }
    return res.status(400).json({
      success: false,
      issues,
    });
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
    if (issueDetail.success) {
      return res.status(200).json({
        success: true,
        issueDetail,
      });
    }
    return res.status(400).json({
      success: false,
      issueDetail,
    });
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
    const newIssue = await issueDao.insertNewIssue(
      authorId,
      milestoneId,
      title,
      description,
      assignees,
      labels
    );
    if (newIssue.success) {
      return res.status(200).json({ success: true });
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
    let updateIssue = await issueDao.updateIssueTitle(title, authorId, issueId);
    if (updateIssue.success) {
      return res.status(200).json({ success: true });
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
    let updateIssue = await issueDao.updateIssueDescription(
      description,
      authorId,
      issueId
    );
    if (updateIssue.success) {
      return res.status(200).json({ success: true });
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
  const { newStatus, userId } = req.body;
  let issueId = req.body.issueId;
  if (typeof issueId === "number") issueId = [issueId];
  try {
    let updatedStatus = await issueDao.updateIssueStatus(
      newStatus,
      userId,
      issueId
    );
    if (updatedStatus.success) {
      return res.status(200).json({ success: true });
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
    if (insertedLabelResult.success) {
      return res.status(200).json({ success: true });
    }
    return res.status(400).json(insertedLabelResult);
  } catch (e) {
    return res
      .status(400)
      .json({ success: false, status: 400, message: e.message });
  }
};

/*이슈에 라벨 삭제 */
exports.deleteLabel = async function (req, res, next) {
  const { issueId, labelId } = req.body;
  try {
    let deletedLabelResult = await issueDao.deleteLabel(issueId, labelId);
    if (deletedLabelResult.success) {
      return res.status(200).json({ success: true });
    }
    return res.status(400).json(deletedLabelResult);
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
    let insertAssigneeResult = await issueDao.insertNewAssignee(
      issueId,
      assigneeId
    );
    if (insertAssigneeResult.success) {
      return res.status(200).json({ success: true });
    }
    return res.status(400).json(insertAssigneeResult);
  } catch (e) {
    return res
      .status(400)
      .json({ success: false, status: 400, message: e.message });
  }
};

exports.deleteAssignee = async function (req, res, next) {
  const { issueId, assigneeId } = req.body;
  try {
    console.log(issueId, assigneeId);
    let deletedAssigneeResult = await issueDao.deleteAssignee(
      issueId,
      assigneeId
    );
    if (deletedAssigneeResult.success) {
      return res.status(200).json({ success: true });
    }
    return res.status(400).json(deletedAssigneeResult);
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
    let insertMilestoneResult = await issueDao.insertNewMilestone(
      milestoneId,
      issueId
    );
    if (insertMilestoneResult.success) {
      return res.status(200).json({ success: true });
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
    if (deleteIssueResult.success) {
      return res.status(200).json({ success: true });
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
    if (issues.success) {
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
    if (issues.success) {
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
    if (issues.success) {
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
    if (issues.success) {
      return res.status(200).json(issues);
    }
    return res.status(400).json(issues);
  } catch (e) {
    return res
      .status(400)
      .json({ success: false, status: 400, message: e.message });
  }
};

/* 이슈 filtering - closed */
exports.filterClosedIssues = async function (req, res, next) {
  try {
    const issues = await issueDao.getIssuesByStatus(false);
    if (issues.success) {
      return res.status(200).json({
        success: true,
        issues,
      });
    }
    return res.status(400).json({
      success: false,
      issues,
    });
  } catch (e) {
    return res
      .status(400)
      .json({ success: false, status: 400, message: e.message });
  }
};

/* 이슈 filtering - opened */
exports.filterOpenedIssues = async function (req, res, next) {
  try {
    const issues = await issueDao.getIssuesByStatus(true);
    if (issues.success) {
      return res.status(200).json({
        success: true,
        issues,
      });
    }
    return res.status(400).json({
      success: false,
      issues,
    });
  } catch (e) {
    return res
      .status(400)
      .json({ success: false, status: 400, message: e.message });
  }
};

/* 이슈 filtering - 특정 유저의 issue */
exports.filterUserIssues = async function (req, res, next) {
  const userId = req.params.userId;
  try {
    const issues = await issueDao.filterIssuesByAuthor(userId);
    if (issues.success) {
      return res.status(200).json(issues);
    }
    return res.status(400).json(issues);
  } catch (e) {
    return res
      .status(400)
      .json({ success: false, status: 400, message: e.message });
  }
};

/* 이슈 filtering - 특정 유저가 assignee로 지정된 이슈 */
exports.filterUserAssignedIssue = async function (req, res, next) {
  const userId = req.params.userId;
  try {
    const issues = await issueDao.filterIssuesByAssignee(userId);
    if (issues.success) {
      return res.status(200).json(issues);
    }
    return res.status(400).json(issues);
  } catch (e) {
    return res
      .status(400)
      .json({ success: false, status: 400, message: e.message });
  }
};

/* 이슈 filtering - commentor */
exports.filterIssuesByCommentor = async function (req, res, next) {
  const commentorId = req.params.commentorId;
  try {
    const issues = await issueDao.filterIssuesByCommentor(commentorId);
    if (issues.success) {
      return res.status(200).json(issues);
    }
    return res.status(400).json(issues);
  } catch (e) {
    return res
      .status(400)
      .json({ success: false, status: 400, message: e.message });
  }
};

/* 이슈 filtering - 여러 조건 */
exports.filterIssues = async function (req, res, next) {
  try {
    const issues = await issueDao.filterIssues(req.params);
    if (issues.success) {
      return res.status(200).json(issues);
    }
    return res.status(400).json(issues);
  } catch (e) {
    return res
      .status(400)
      .json({ success: false, status: 400, message: e.message });
  }
};
