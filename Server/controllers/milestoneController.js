const milestoneModel = require("../models").milestone;

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

exports.updateMilestone = async (req, res) => {
    let { milestoneId, title, description, dueDate } = req.body;
    console.log(milestoneId, title, description, dueDate)
    try{
        let milestone = await milestoneModel.findOne({
            where: {id:milestoneId}
        });
        console.log(milestone);
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

exports.updateMilestoneStatus = async (req, res) => {
    let { milestoneId, newStatus } = req.body;

    try{
        let milestone = await milestoneModel.findOne({where:{id:milestoneId}});
        await milestone.update({newStatus:newStatus});
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
