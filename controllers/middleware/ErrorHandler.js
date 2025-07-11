const {constants} = require('../../constants')

const ErrorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;

    switch(statusCode){
        case constants.VALIDATION_ERROR:
            res.json({ title: "Validation Fialed",message: err.message, stackTrace: err.stack})
            break;
        case constants.NOT_FOUND: 
            res.json({ title: "Not Found",message: err.message, stackTrace: err.stack})
            break;
        case constants.UNAUTHORISED: 
            res.json({ title: "Not UnAuthorised",message: err.message, stackTrace: err.stack})
            break; 
        case constants.SERVER_ERROR: 
            res.json({ title: "Server Error",message: err.message, stackTrace: err.stack})
            break;    
        case constants.FORBIDDEN: 
            res.json({ title: "ForBidden",message: err.message, stackTrace: err.stack})
            break; 
        default: break;
    }
}

module.exports = ErrorHandler;