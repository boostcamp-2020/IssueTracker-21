const commentModel = require("../models").comment;

exports.insertComment = async (req, res) => {
    let { authorId, issueId, content, createDate } = req.body;
    try{
        let newComment = await commentModel.create({
            authorId: authorId,
            issueId: issueId,
            content: content,
            createDate: createDate
        });
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

exports.updateComment = async (req, res) => {
    let { commentId, authorId, issueId, content, createDate } = req.body;
    try{
        let comment = await commentModel.findOne({where: {id: commentId}});
        await comment.update({
            authorId: authorId,
            issueId: issueId,
            content: content,
            createDate: createDate
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
