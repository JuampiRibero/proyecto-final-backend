const ProductService = require("./productService.js");
const OrderService = require("./orderService.js");
const UserService = require("./userService.js");

module.exports = {
  productService: new ProductService(),
  orderService: new OrderService(),
  userService: new UserService(),
};
