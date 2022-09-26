const BaseRepository = require("./baseRepository.js");
const { loggerError } = require("../../../logger/log4js.js");

class MessageRepository extends BaseRepository {
  constructor(model) {
    super();
    this.model = model;
  }

  async getAllMsg() {
    try {
      const messages = await this.model;
      return messages;
    } catch (error) {
      loggerError.error(error);
    }
  }
}

module.exports = MessageRepository;
