const models = require("../models");
const issueModel = models.issue;
const commentModel = models.comment;
const assigneeModel = models.assignee;
const labelModel = models.label;
const issueLabelModel = models.issuelabel;
const milestoneModel = models.milestone
const userModel = models.user
const sequelize = require("sequelize");
const { Op } = require("sequelize");
const { resolveConfigFile } = require("prettier");

exports.getAllIssues = async () => {
    return new Promise(async (resolve, reject) => {
        try{
            let allIssues = await issueModel.findAndCountAll({
                include: [
                  {
                    model: milestoneModel,
                    required: false,
                    attributes: ["title"],
                  },
                  {
                    model: userModel,
                    as: "users",
                    attributes: ["id", "profile"],
                  },
                  {
                    model: labelModel,
                    as: "labels",
                  },
                ],
              });
            resolve({success:true, allIssues});
        }catch(e){
            reject({error:e});
        }
    })
}

exports.getIssueDetail = async (issueId) => {
    return new Promise(async (resolve, reject) =>{
        try{
            const issueDetail = await issueModel.findOne({
                include: [
                  {
                    model: milestoneModel,
                    required: false,
                    attributes: ["title"],
                  },
                  {
                    model: userModel,
                    as: "users",
                    attributes: ["id", "profile"],
                  },
                  {
                    model: labelModel,
                    as: "labels",
                  },
                ],
                where: {
                  id: issueId,
                },
              });
              const comments = await commentModel.findAndCountAll({
                where: {
                  issueId: issueId,
                },
              });
            resolve({success:true, issueDetail, comments});
        }catch(e){
            reject({error:e});
        }
    });
}

exports.insertNewIssue = async (authorId,milestoneId,title,description,assignees,labels) => {
    return new Promise(async (resolve, reject) => {
        try{
            await issueModel.create({
                authorId: authorId,
                milestoneId: milestoneId,
                title: title,
                description: description,
              });
              assignees.forEach((element) => {
                assigneeModel.create({
                  issueId: newIssue.dataValues.id,
                  userId: element,
                });
              });
              labels.forEach((element) => {
                issueLabelModel.create({
                  issueId: newIssue.dataValues.id,
                  labelId: element,
                });
              });
            resolve({success:true});
        }catch(e){
            reject({error:e});
        }
    });
}

exports.updateIssueTitle = async (title,authorId,issueId) => {
    return new Promise(async (resolve, reject) => {
        try{
            await issueModel.update(
                {
                  title: title,
                  authorId: authorId,
                },
                {
                  where: {
                    id: issueId,
                  },
                }
              );
            resolve({success:true});
        }catch(e){
            reject({error:e});
        }
    });
}

exports.updateIssueDescription = async (description,authorId, issueId) => {
    return new Promise(async (resolve, reject) => {
        try{
            await issueModel.update(
                {
                  description: description,
                  authorId: authorId,
                },
                {
                  where: {
                    id: issueId,
                  },
                }
              );
            resolve({success:true});
        }catch(e){
            reject({error:e});
        }
    });
}

exports.updateIssueStatus = async (newStatus,userId,issueId) => {
    return new Promise(async (resolve, reject) => {
        try{
            await issueModel.update(
                {
                  isOpened: newStatus,
                  lastStatusChanger: userId,
                },
                {
                  where: {
                    id: issueId,
                  },
                }
              );
            resolve({success:true});
        }catch(e){
            reject({error:e});
        }
    });
}

exports.insertNewLabel = async (issueId, labelId) => {
    return new Promise(async (resolve, reject) => {
        try{
            await issueLabelModel.create({
                issueId: issueId,
                labelId: labelId,
            });
            resolve({success:true});
        }catch(e){
            reject({error:e});
        }
    });
}

exports.insertNewAssignee = async (issueId,assigneeId) => {
    return new Promise(async (resolve, reject) => {
        try{
            await assigneeModel.create({
                issueId: issueId,
                userId: assigneeId,
              });
            resolve({success:true});
        }catch(e){
            reject({error:e});
        }
    });
}

exports.insertNewMilestone = async (milestoneId, issueId) => {
    return new Promise(async (resolve, reject) => {
        try{
            await issueModel.update(
                {
                  milestoneId: milestoneId,
                },
                {
                  where: {
                    id: issueId,
                  },
                }
              );
            resolve({success:true});
        }catch(e){
            reject({error:e});
        }
    });
}

exports.deleteIssue = async (issueId) => {
    return new Promise(async (resolve, reject) => {
        try{
            await issueModel.destroy({
                where: {
                  id: issueId,
                },
              });
            resolve({success:true});
        }catch(e){
            reject({error:e});
        }
    });
}

exports.filterIssuesByAuthor = async (authorId) => {
    return new Promise(async (resolve, reject) => {
        try{
            const issues = await issueModel.findAndCountAll({
                include: [
                  {
                    model: milestoneModel,
                    required: false,
                    attributes: ["title"],
                  },
                  {
                    model: userModel,
                    required: false,
                    as: "users",
                    attributes: ["id", "profile"],
                  },
                  {
                    model: labelModel,
                    required: false,
                    as: "labels",
                  },
                ],
                where: {
                  authorId: authorId,
                },
              });
              resolve({success:true, issues:issues});
        }catch(e){
            reject({error:e});
        }
    });
}

exports.filterIssuesByLabel = async (labelId) => {
    return new Promise(async (resolve, reject) => {
        try{
          const issues = await issueModel.findAndCountAll({
                include: [
                  {
                    model: milestoneModel,
                    required: false,
                    attributes: ["title"],
                  },
                  {
                    model: userModel,
                    required: false,
                    as: "users",
                    attributes: ["id", "profile"],
                  },
                  {
                    model: labelModel,
                    required: false,
                    as: "labels",
                  },
                ],
                where: {
                  "$labels.id$": labelId,
                },
              });
            resolve({success:true, issues});
        }catch(e){
            reject({error:e});
        }
    });
}

exports.filterIssuesByMilestone = async (milestoneId) => {
    return new Promise(async (resolve, reject) => {
        try{
          const issues = await issueModel.findAndCountAll({
                include: [
                  {
                    model: milestoneModel,
                    required: false,
                    attributes: ["title"],
                  },
                  {
                    model: userModel,
                    required: false,
                    as: "users",
                    attributes: ["id", "profile"],
                  },
                  {
                    model: labelModel,
                    required: false,
                    as: "labels",
                  },
                ],
                where: {
                  milestoneId: milestoneId,
                },
              });
            resolve({success:true, issues});
        }catch(e){
            reject({error:e});
        }
    });
}

exports.filterIssuesByAssignee = async (assigneeId) => {
    return new Promise(async (resolve, reject) => {
        try{
          const issues = await issueModel.findAndCountAll({
                include: [
                  {
                    model: milestoneModel,
                    required: false,
                    attributes: ["title"],
                  },
                  {
                    model: userModel,
                    required: false,
                    as: "users",
                    attributes: ["id", "profile"],
                  },
                  {
                    model: labelModel,
                    required: false,
                    as: "labels",
                  },
                ],
                where: {
                  "$users.id$": assigneeId,
                },
              });
            resolve({success:true, issues});
        }catch(e){
            reject({error:e});
        }
    });
}

exports.getIssuesByStatus = async (status) => {
  return new Promise(async (resolve, reject) => {
      try{
          let issues = await issueModel.findAndCountAll({
              include: [
                {
                  model: milestoneModel,
                  required: false,
                  attributes: ["title"],
                },
                {
                  model: userModel,
                  as: "users",
                  attributes: ["id", "profile"],
                },
                {
                  model: labelModel,
                  as: "labels",
                },
              ],
              where: {
                isOpened: status,
              },
            });
          resolve({success:true, issues});
      }catch(e){
          reject({error:e});
      }
  })
}