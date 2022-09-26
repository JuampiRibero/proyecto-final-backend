const { loggerTrace } = require("../logger/log4js.js");

exports.isAdmin = (req, res, next) => {
  if (req.session.passport.user.admin) {
    loggerTrace.trace("Es Admin");
    next();
  } else {
    res.status(401).redirect("/welcome");
  }
};
