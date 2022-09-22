const chatMessagesMock = require("../../../../__test__/mock/chatMessages.mock.js");
const MessageRepository = require("./messageRepository.js");

module.exports = {
  messagesRepository: new MessageRepository(chatMessagesMock),
};
