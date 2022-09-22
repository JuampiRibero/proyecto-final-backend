const { productService } = require("../services");
const productController = require("./productController.js");

const orderController = require("./orderController.js");
const { orderService } = require("../services");

const userController = require("./userController.js");
const { userService } = require("../services");

module.exports = {
  productController: productController(productService),
  orderController: orderController(orderService),
  userController: userController(userService),
};
