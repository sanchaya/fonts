class AppError extends Error {
    constructor(message, statusCode) {
      super(message);
      this.statusCode = statusCode;
      this.isOperational = true;
      this.status = String(statusCode).startsWith('2') ? 'success' : 'fail';
  
      Error.captureStackTrace(this, this.constructor);
    }
  
    sendResponse(res) {
      res.status(this.statusCode).json({
        status: this.status,
        error: this.message,
      });
    }
  }
  module.exports = AppError;