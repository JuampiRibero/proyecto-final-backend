const auth = function (req, res, next) {
  if (!req.session.user) {
    console.log(
      "Se denegó el acceso ya que no hay sesión. Será redirigido a /login."
    );
    return res.redirect("/login");
  }
  const user = req.session.user.username;
  console.log("Hay sesión.");
  console.log(`El usuario ${user} ingresó a /welcome.`);
  next();
};
module.exports = { auth };
