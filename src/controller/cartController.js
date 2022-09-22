const CartSessionService = require("../services/cartSession.js");
const cartSession = new CartSessionService();

exports.postCartSession = async (req, res, next) => {
  await cartSession.addProductsToSession(req.body, req.session);
  res.status(201).redirect("/api/cart/get-session");
};

exports.getCartSession = async (req, res, next) => {
  const response = await cartSession.getProductsFromSession(
    req.session.cartSession
  );
  res.render("./pages/checkout-cart", {
    layout: "checkout-cart",
    response: response.products,
  });
};
