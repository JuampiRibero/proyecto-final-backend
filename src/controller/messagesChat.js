const MessagesChatService = require("../services/messagesChat.js");
const messageChat = new MessagesChatService();

const { normalize, schema } = require("normalizr");

exports.createMsg = async (req, res, next) => {
  try {
    const msgCreated = await messageChat.createMessage(req.body);
    res.json({ msg: "Message Chat created!", messageChat: msgCreated });
  } catch (error) {
    console.log(error);
    const errorMsg = {
      message: "No se creó mensaje",
      mesgCreated: false,
      error: error,
    };
    res.status(400).json(errorMsg);
  }
};

exports.getAllMsgChat = async (req, res, next) => {
  try {
    const allMsgChat = await messageChat.getAllMessage();
    const historyChat = { id: 1, content: allMsgChat };
    const userSchema = new schema.Entity("author");
    const entrySchema = new schema.Entity(
      "entries",
      {
        author: userSchema,
      },
      { idAttribute: (value) => value._id.toString() }
    );
    const chatSchema = new schema.Entity("chat", {
      content: [entrySchema],
    });
    const normalizedChat = normalize(historyChat, chatSchema);
    res.render("./pages/chat");
  } catch (error) {
    console.log(error);
    const errorMsg = {
      message: "No se cargaron mensajes",
      mesgFounded: false,
      error: error,
    };
    res.status(400).json(errorMsg);
  }
};

exports.getMsgByEmail = async (req, res, next) => {
  try {
    res.render("./pages/chat-by-email", { layout: "chat-private" });
  } catch (error) {
    console.log(error);
    const errorMsg = {
      message: "No se cargaron mensajes",
      mesgFounded: false,
      error: error,
    };
    res.status(400).json(errorMsg);
  }
};
