const cartController = require("../controller/cartController.js");

module.exports = (router) => {
  router

    .post("/api/cart/post-session", cartController.postCartSession)
    .get("/api/cart/get-session", cartController.getCartSession);

  return router;
};
