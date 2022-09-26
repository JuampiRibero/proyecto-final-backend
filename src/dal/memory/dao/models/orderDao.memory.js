const mockOrder = require("../../../../../__test__/mock/orders.mock.js");

const { loggerError } = require("../../../../logger/log4js.js");

module.exports = class {
  constructor() {
    this.orders = mockOrder;
  }

  async create(order) {
    try {
      await this.orders.push(order);
    } catch (error) {
      loggerError.error(error);
    }
  }

  async find() {
    try {
      const response = await this.orders;
      return response;
    } catch (error) {
      loggerError.error(error);
    }
  }

  async findById(id) {
    try {
      const [response] = await this.orders.filter((order) => order._id == id);
      return response;
    } catch (error) {
      loggerError.error(error);
    }
  }

  async deleteById(id) {
    try {
      const response = await this.orders.filter((order) => order._id != id);
      this.orders = response;
      return response;
    } catch (error) {
      loggerError.error(error);
    }
  }

  async updateById(id, payload) {
    try {
    } catch (error) {
      loggerError.error(error);
    }
  }
};
