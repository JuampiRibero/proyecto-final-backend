const {
  loggerWarn,
  loggerTrace,
} = require("../logger/log4js.js");

const auth = function (req, res, next) {
  if (!req.session.user) {
    loggerWarn.warn(
      "Se denegó el acceso ya que no hay sesión. Será redirigido a /login."
    );
    return res.redirect("/login");
  }
  const user = req.session.user.username;
  loggerTrace.trace("Hay sesión.");
  loggerTrace.trace(`El usuario ${user} ingresó a /welcome.`);
  next();
};
module.exports = { auth };
