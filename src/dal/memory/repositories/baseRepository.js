const { loggerError } = require("../../../logger/log4js.js");

class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  async getAll() {
    try {
      const elements = await this.model;
      return elements;
    } catch (error) {
      loggerError.error(error);
    }
  }

  async getById(id) {
    try {
      const element = await this.model.filter((element) => element._id == id);
      return element;
    } catch (error) {
      loggerError.error(error);
    }
  }

  async create(element) {
    try {
      const elementCreated = await this.model.push(element);
      return elementCreated;
    } catch (error) {
      loggerError.error(error);
    }
  }

  async delete(id) {
    try {
      const elementDeleted = await this.model.filter(
        (element) => element._id != id
      );
      return elementDeleted;
    } catch (error) {
      loggerError.error(error);
    }
  }

  async update(id, payload) {
    try {
      const msgFinded = this.model.findIndex((element) => element._id == id);
      if (msgFinded < -1) {
        return { msg: "No se encontró chat" };
      }

      this.model[msgFinded] = {
        text: payload,
      };

      return this.model[msgFinded];
    } catch (error) {
      loggerError.error(error);
    }
  }
}

module.exports = BaseRepository;
