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
    .get("/failsignup", (req, res, next) => {
      res.status(400).redirect("/error-signup");
    })

    .post("/api/login", logIn, logInCallback)
    .get("/faillogin", (req, res, next) => {
      res.status(400).redirect("/error-login");
    })

    .post("/api/logout", logOut);

  return router;
};
