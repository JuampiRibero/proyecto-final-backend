const { loggerError } = require("../../../logger/log4js.js");

const BaseRepository = require("./baseRepository.js");

class MessageRepository extends BaseRepository {
  constructor(model) {
    super();
    this.model = model;
  }

  async getAllMsg() {
    try {
      const messages = await this.model.find().lean();
      return messages;
    } catch (error) {
      loggerError.error(error);
    }
  }

  async getMsgByEmail(email) {
    try {
      const response = await this.model.find({ "author.id": email });
      return response;
    } catch (error) {
      loggerError.error(error);
    }
  }
}

module.exports = MessageRepository;
