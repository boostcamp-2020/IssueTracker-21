const labelModel = require('../models/label');


exports.getLabels = async (req, res, next) => {
    try {
        const labeList = await labelModel.findAll();
        return res.status(200).json({
            success: true,
            labels: labelList,
        });
    }
    catch (e) {
        return res.status(400).json({
            success: false,
            error: e,
        });
    }
};


exports.insertLabel = async(req, res, next) => {
    try{
        const {name, description, color} = req.body();
        await labelModel.create({
            name,
            description,
            color,
        });
        return res.status(200).json({
            success: true,
        });
    }
    catch(e) {
        res.status(400).json({
            success: false,
            error: e,
        });
    }
};

exports.updateLabel = async(req, res, next) => {
    try {
        const {labelId, name, description, color} = req.body();
        await labelModel.update({
            name,
            description,
            color,
        }, {where: {id : {labelId}}} );

        return res.status(200).json({
            success: true,
        });
    }
    catch(e) {
        res.status(400).json({
            success: false,
            error: e,
        });
    }
}

exports.deleteLabel = async (req, res, next) => {
    try{
        const { labelId } = req.body;
        await labelModel.destroy({
            where: {id: labelId}
        });

        return res.status(200).json({
            success: true,
        });
    }
    catch(e) {
        res.status(400).json({
            success: false,
            error: e,
        });
    }
}