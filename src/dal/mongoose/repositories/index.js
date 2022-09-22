const ModelMessagesMongoose = require("../schemas/messagesMongoose.js");
const MessageRepository = require("./messageRepository.js");

module.exports = {
  messagesRepositoryMoongose: new MessageRepository(ModelMessagesMongoose),
};
