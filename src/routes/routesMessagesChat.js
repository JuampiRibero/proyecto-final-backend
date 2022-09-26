const messagesController = require("../controller/messagesChatController.js");
module.exports = (router) => {
  router
    .get("/api/message/list-messages", messagesController.getAllMsgChat)
    .post("/api/message/new-message", messagesController.createMsg);
  return router;
};
