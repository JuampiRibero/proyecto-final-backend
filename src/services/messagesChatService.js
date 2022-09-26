const messagesChat = require("../dal/mongoose/schemas/messagesMongoose.js");

const { loggerError } = require("../logger/log4js.js");

module.exports = class {
  async createMessage(msg) {
    try {
      await messagesChat.create(msg);
    } catch (error) {
      loggerError.error(error);
    }
  }

  async getAllMessage() {
    try {
      const allMessage = await messagesChat.find().lean();
      return allMessage;
    } catch (error) {
      loggerError.error(error);
    }
  }
};
