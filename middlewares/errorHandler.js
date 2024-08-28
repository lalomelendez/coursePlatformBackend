import logger from "../config/logger.js";

const errorHandler = (err, req, res, next) => {
  logger.error(err.message);

  if (res.headersSent) {
    return next(err);
  }

  const status = err.status || 500;
  const response = {
    message: err.message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  };

  res.status(status).json(response);
};

export default errorHandler;
