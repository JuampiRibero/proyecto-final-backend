const { userModel } = require("../../schemas/userMongoose.js");

const { loggerError } = require("../../../../logger/log4js.js");

module.exports = class {
  constructor() {
    this.user = userModel;
  }

  async findUsers() {
    try {
      return await this.user.find();
    } catch (error) {
      loggerError.error(error);
    }
  }

  async findUserByEmail({ email }) {
    try {
      return await this.user.findOne({ email: email });
    } catch (error) {
      loggerError.error(error);
    }
  }

  async findUserById(id) {
    try {
      return await this.user.findById(id);
    } catch (error) {
      loggerError.error(error);
    }
  }

  async createUser(userToCreate) {
    try {
      return await this.user.create(userToCreate);
    } catch (error) {
      loggerError.error(error);
    }
  }

  async deleteUserById(id) {
    try {
      const response = await this.user.findByIdAndRemove(id);
      return response;
    } catch (error) {
      loggerError.error(error);
    }
  }

  async updateUserById(id, payload) {
    try {
      const response = await this.user.findByIdAndUpdate(id, payload, {
        new: true,
      });
      return response;
    } catch (error) {
      loggerError.error(error);
    }
  }
};
