const {
  signUpLocal,
  signUpLocalCallback,
  logIn,
  logInCallback,
  logOut,
} = require("../controller/authController");

module.exports = (router) => {
  router
    .post("/api/signup", signUpLocal, signUpLocalCallback)
    .get("/error-signup", (req, res, next) => {
      res.status(400).redirect("/signup-error");
    })

    .post("/api/login", logIn, logInCallback)
    .get("/error-login", (req, res, next) => {
      res.status(400).redirect("/login-error");
    })

    .post("/api/logout", logOut);

  return router;
};
