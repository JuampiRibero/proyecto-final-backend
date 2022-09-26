const { checkAuthentication } = require("../auth/checkAuth.js");
const { isAdmin } = require("../auth/isAdmin.js");

const { productController } = require("../controller");

const chatController = require("../controller/messagesChatController.js");

const cartController = require("../controller/cartController.js");

const signUpController = require("../controller/signupController.js");

module.exports = (router) => {
  router
    .get("/", checkAuthentication, (req, res, next) => {
      res.redirect("/productos/vista");
    })

    .get("/productos/vista", checkAuthentication, productController.findAll)
    .get("/productos/agregar", checkAuthentication, (req, res, next) => {
      res.render("./pages/agregar");
    })
    .get(
      "/productos/:category",
      checkAuthentication,
      productController.getByCategory
    )
    .get(
      "/productos/detalle/:id",
      checkAuthentication,
      productController.getOne
    )

    .get("/buscar/precio?", checkAuthentication, productController.getByPrice)

    .get("/carrito/vista", checkAuthentication, cartController.getCartSession)
    .get("/purchase-completed", (req, res, next) => {
      res.render("./pages/purchase-completed");
    })

    .get("/chat-view", checkAuthentication, chatController.getAllMsgChat)
    .get("/chat/:email", checkAuthentication, chatController.getMsgByEmail)

    .get("/login", (req, res, next) => {
      res.render("./pages/login", { layout: "login-signup.hbs" });
    })
    .get("/signup", signUpController.signUp)

    .get("/welcome", checkAuthentication, (req, res, next) => {
      const data = req.session.passport;
      res.render("./pages/welcome", { data });
    })
    .get("/goodbye", (req, res, next) => {
      res.render("./pages/goodbye");
    })

    .get("/login-error", (req, res, next) => {
      res.render("./pages/login-error");
    })
    .get("/signup-error", (req, res, next) => {
      res.render("./pages/signup-error");
    })

    .get("/server-config", isAdmin, (req, res, next) => {
      const {
        MONGO_URI,
        PORT,
        PERSISTENCE,
        EXPIRATION_SESSION,
        GMAIL_USER,
        GMAIL_USER_PASS,
      } = require("../config/globals.js");
      const data = {
        mongoUri: MONGO_URI,
        port: PORT,
        persistence: PERSISTENCE,
        expirationSession: EXPIRATION_SESSION,
        gmailUser: GMAIL_USER,
        gmailPass: GMAIL_USER_PASS,
      };

      res.status(200).render("./pages/server-config", {
        layout: "server-config.hbs",
        data,
      });
    });
  return router;
};
