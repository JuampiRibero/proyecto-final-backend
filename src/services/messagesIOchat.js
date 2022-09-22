const { PERSISTENCE } = require("../config/globals.js");
const persistenceFactory = require("../dal/factory.js");
let { persistenceMessages } = persistenceFactory.newPersistence(PERSISTENCE);

const { twilioSmsChat } = require("../sms/twilio");

module.exports = (io, sessionMiddleware) => {
  io.use(function (socket, next) {
    sessionMiddleware(socket.request, socket.request.res, next);
  });

  io.on("connection", async (socket) => {
    console.log(`Usuario conectado ${socket.id}`);

    try {
      const allMsgChat = await persistenceMessages.getAllMsg();
      socket.emit("list-msg-chat", allMsgChat);
    } catch (error) {
      console.log(error);
    }

    try {
      const user = socket.request.session.passport.user.email;
      const privateMsgChat = await persistenceMessages.getMsgByEmail(user);

      socket.emit("list-msg-chat-private", privateMsgChat);
    } catch (error) {
      console.log(error);
    }

    socket.on("msg-chat", async (data) => {
      try {
        if (data.text.includes("administrador")) {
          twilioSmsChat(data.author.id, data.text);
        }
        await persistenceMessages.create(data);
      } catch (error) {
        console.log(error);
      }

      try {
        const allMsgChat = await persistenceMessages.getAllMsg();
        io.emit("list-msg-chat", allMsgChat);
      } catch (error) {
        console.log(error);
      }
    });

    socket.on("disconnect", () => {
      console.log(`El usuario ${socket.id} se desconectó`);
    });
  });

  return io;
};
