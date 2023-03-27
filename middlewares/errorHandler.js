const errorHandler = async(err,req,res,next)=>{
    console.log(`ERROR IN ERROR HANLDER`,err);
    console.log("ERROR CODEZZZ", err.code);
    console.log(err.stack);
    //res.status(500).send(err.message);
    let error_code = err.code || 500;
    res.status(error_code).json({
        status:error_code,
        data:{},
        msg:err.message
    });
}

module.exports = errorHandler