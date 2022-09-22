const express = require("express");

const routesProducts = require("./routesProducts");
const routerProducts = express.Router();
const routesCart = require("./routesCart");
const routerCart = express.Router();
const routesOrder = require("./routesOrder");
const routerOrder = express.Router();
const routesMessagesChat = require("./routesMessagesChat");
const routerMessagesChat = express.Router();
const routesAuth = require("./routesAuth");
const routerAuth = express.Router();
const routesProcessInfo = require("./routesProcessInfo");
const routerProcessInfo = express.Router();
const routesUser = require("./routesUser");
const routerUser = express.Router();

const routesView = require("./routesView");
const routerViews = express.Router();

module.exports = routesConfig = (app) => {
  app.use(routesProducts(routerProducts));
  app.use(routesCart(routerCart));
  app.use(routesOrder(routerOrder));
  app.use(routesAuth(routerAuth));
  app.use(routesView(routerViews));
  app.use(routesUser(routerUser));
  app.use(routesProcessInfo(routerProcessInfo));

  app.use(routesMessagesChat(routerMessagesChat));
};
