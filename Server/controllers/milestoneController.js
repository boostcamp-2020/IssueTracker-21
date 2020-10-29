const milestoneModel = require("../models").milestone;

/* 모든 마일스톤 조회 */
exports.getMilestone = async (req, res) => {
    try{
        let milestones = await milestoneModel.findAll();
        return res.status(200).json({
            success:true,
            milestones: milestones
        });
    }catch(e){
        return res.status(400).json({
            success:false,
            error:e
        });
    }
}

/* 마일스톤 생성 */
exports.insertMilestone = async (req, res) => {
    let { title, description, dueDate } = req.body;
    try{
        await milestoneModel.create({
            title:title,
            description:description,
            dueDate:dueDate
        });
        return res.status(200).json({
            success:true
        });
    }catch(e){
        return res.status(400).json({
            success:false,
            error:e
        });
    }
}

/* 마일스톤 수정 */
exports.updateMilestone = async (req, res) => {
    let { milestoneId, title, description, dueDate } = req.body;
    try{
        let milestone = await milestoneModel.findOne({
            where: {id:milestoneId}
        });
        await milestone.update({
            title:title,
            description:description,
            dueDate:dueDate
        });
        return res.status(200).json({
            success:true
        });
    }catch(e){
        return res.status(400).json({
            success:false,
            error:e
        });
    }
}

/* 마일스톤 삭제 */
exports.deleteMilestone = async (req, res) => {
    let { milestoneId } = req.body;
    try{
        await milestoneModel.destroy({where: {id:milestoneId}});
        return res.status(200).json({
            success:true
        });
    }catch(e){
        return res.status(400).json({
            success:false,
            error: e
        });
    }
}

/* 마일스톤 상태 수정 */
exports.updateMilestoneStatus = async (req, res) => {
    let { milestoneId, newStatus } = req.body;
    try{
        await milestone.update({
            newStatus:newStatus
        },{
            where:{id:milestoneId}
        });
        return res.status(200).json({
            success:true,
            error:e
        });
    }catch(e){
        return res.status(400).json({
            success:false,
            error:e
        });
    }
}
