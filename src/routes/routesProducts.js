const { productController } = require("../controller");

module.exports = (router) => {
  router
    .post("/api/product", productController.createProduct)
    .get("/api/product/:id", productController.getOne)
    .get("/api/product", productController.findAll)
    .patch("/api/product/:id", productController.updateProduct)
    .delete("/api/product/:id", productController.deleteOne)
    .get("/api/product/category/:category", productController.getByCategory)
    .get("/api/product/title/:title", productController.getByName)
    .get("/api/product/code/:code", productController.getByCode)
    .post("/api/product/price/search", productController.getByPrice)
    .get("/api/product/stock/search", productController.getByStock);

  return router;
};
