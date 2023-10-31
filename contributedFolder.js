const ContributedFolder = require('./models/contributedmodel');
const catchAsync=require('./catchAsync');
const AppError = require('./appError');
const Blob = require('node:buffer').Blob;

exports.addfont = async function(req, res, next) {
    try{
        const font_file = new Blob([req.file.buffer], {type: 'application/octet-stream'});
        // let font_file = req.file;
        console.log(req.file);
        console.log(font_file);
        let{
            font_name,
            font_style,
            sample_paragraph,
            designed_by,
            font_license,
            font_url,
            submitter_name,
            email,
        }=req.body;
        console.log(req.body);
        const contributions = new ContributedFolder({
            font_name,
            font_style,
            sample_paragraph,
            designed_by,
            font_license,
            font_url,
            submitter_name,
            email,
            font_file
        });
        await contributions.save();
        res.status(200).json({
            status:"success",
            message:"Font Added successfully",
            data:{
                contributions,
            },
        });
    }
    catch(err){
        const error = new AppError(err.message,500);
        error.sendResponse(res);
    }
};
