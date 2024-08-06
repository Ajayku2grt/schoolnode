const { constants } = require("../constant"); // Ensure the correct path to contact.js

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.status(constants.VALIDATION_ERROR).json({
                title: "Validation Failed", 
                message: err.message, 
                stackTrace: err.stack
            });
            break;
        case constants.NOT_FOUND:
            res.status(constants.NOT_FOUND).json({
                title: "Not Found", 
                message: err.message, 
                stackTrace: err.stack
            });
            break; // Add missing break
        case constants.UNAUTHORIZED:
            res.status(constants.UNAUTHORIZED).json({
                title: "Unauthorized", 
                message: err.message, 
                stackTrace: err.stack
            });
            break; // Add missing break
        case constants.FORBIDDEN:
            res.status(constants.FORBIDDEN).json({
                title: "Forbidden", 
                message: err.message, 
                stackTrace: err.stack
            });
            break; // Add missing break
        case constants.SERVER_ERROR:
            res.status(constants.SERVER_ERROR).json({
                title: "Server Error", 
                message: err.message, 
                stackTrace: err.stack
            });
            break;    
        default:
            console.log("all good");
            res.status(200).json({
                title: "Unknown Error",
                message: err.message,
                stackTrace: err.stack
            });
            break;
    }
};

module.exports = errorHandler;
