const commentModel = require("../models").comment;

/* 새로운 코멘트 생성 */
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

/* 코멘트 수정 */
exports.updateComment = async (req, res) => {
    let { commentId, authorId, issueId, content, createDate } = req.body;
    try{
        await commentModel.update({
            authorId: authorId,
            issueId: issueId,
            content: content,
            createDate: createDate
        },  {
            where: {id: commentId}
        } );
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
