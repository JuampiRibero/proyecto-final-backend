const { orderController } = require("../controller");

module.exports = (router) => {
  router
    .post("/api/order", orderController.createOrder)
    .get("/api/order", orderController.getAllOrder)
    .get("/api/order/id/:id", orderController.getOneOrder)
    .delete("/api/order/id/:id", orderController.deleteOneOrder)
    .patch("/api/order/id/:id", orderController.updateOneOrder);

  return router;
};
