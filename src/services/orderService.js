const { PERSISTENCE } = require("../config/globals.js");
const persistenceFactory = require("../dal/factory.js");
let { persistenceOrder } = persistenceFactory.newPersistence(PERSISTENCE);

const { loggerError } = require("../logger/log4js.js");

module.exports = class {
  constructor() {
    this.orderModel = persistenceOrder;
  }

  async createOrder(order) {
    try {
      return await this.orderModel.create(order);
    } catch (error) {
      loggerError.error(error);
      const errorMsg = {
        message: `No se creo orden.`,
        orderCreated: false,
        error: error,
      };
      // res.status(400).json(errorMsg);
    }
  }

  async getAllOrders() {
    try {
      return await this.orderModel.find();
    } catch (error) {
      loggerError.error(error);
      const errorMsg = {
        message: `No se encontrĂ³ ordenes.`,
        orderFinded: false,
        error: error,
      };
      // res.status(400).json(errorMsg);
    }
  }

  async getOneOrder(id) {
    try {
      return await this.orderModel.findById(id);
    } catch (error) {
      loggerError.error(error);
      const errorMsg = {
        message: `No se encontrĂ³ orden con id ${id}.`,
        orderFinded: false,
        error: error,
      };
      // res.status(400).json(errorMsg);
    }
  }

  async deleteOneOrder(id) {
    try {
      return await this.orderModel.deleteById(id);
    } catch (error) {
      loggerError.error(error);
      const errorMsg = {
        message: `No se encontrĂ³ orden con id ${id}.`,
        orderDeleted: false,
        error: error,
      };
      // res.status(400).json(errorMsg);
    }
  }

  async updateOneOrder(id, payload) {
    try {
      return await this.orderModel.updateById(id, payload);
    } catch (error) {
      loggerError.error(error);
      const errorMsg = {
        message: `No se encontrĂ³ orden con id ${id}.`,
        orderUpdated: false,
        error: error,
      };
      // res.status(400).json(errorMsg);
    }
  }
};
