const { createError } = require('../utils/error');
const jwt = require("jsonwebtoken");
require("dotenv").config();
exports.verifyToken = (req, res, next) => {
    console.log(req.cookies);
  const token = req.cookies;
  if (!token) {
    return next(createError(401, "You are not authenticated!"));
  }

  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return next(createError(403, "Token is not valid!"));
    req.user = user;
    next();
  });
};

exports.verifyUser = (req, res, next) => {
  exports.verifyToken(req, res, (err) => {
    if (err) return next(err);
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};

exports.verifyAdmin = (req, res, next) => {
  exports.verifyToken(req, res, (err) => {
    if (err) return next(err);
    if (req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};
