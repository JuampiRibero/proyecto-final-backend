const cartController = require("../controller/cartController.js");

module.exports = (router) => {
  router

    .post("/api/cart", cartController.postCartSession)
    .get("/api/cart", cartController.getCartSession);

  return router;
};
