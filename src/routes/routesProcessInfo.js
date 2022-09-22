const { processInfo } = require("../utils/processInfo.js");
const { isAdmin } = require("../auth/isAdmin.js");

module.exports = (router) => {
  router.get("/info", isAdmin, (req, res, next) => {
    res.render("./pages/server-info", { processInfo });
  });
  return router;
};
