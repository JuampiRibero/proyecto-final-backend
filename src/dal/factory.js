class PersistenceFactory {
  newPersistence = (type) => {
    switch (type) {

      
      /* PERSISTENCIA EN MEMORIA */
      case "memory":
        console.log("[Persistence] : Memory");
        const persistenceMemoryProduct = require("../dal/memory/dao/models/productDao.memory.js");
        const persistenceMemoryUser = require("../dal/memory/dao/models/userDao.memory.js");
        const persistenceMemoryOrder = require("../dal/memory/dao/models/orderDao.memory.js");
        const {
          messagesRepository,
        } = require("../dal/memory/repositories/index.js");

        return {
          persistenceProduct: new persistenceMemoryProduct(),
          persistenceUser: new persistenceMemoryUser(),
          persistenceOrder: new persistenceMemoryOrder(),
          persistenceMessages: messagesRepository,
        };


      /* PERSISTENCIA EN MONGO DB */
      case "mongodb":
        console.log("[Persistence] : MongoDB");
        const persistenceMongoDBProduct = require("../dal/mongoose/dao/models/productDao.mongoose.js");
        const persistenceMongoDBUser = require("../dal/mongoose/dao/models/userDao.mongoose.js");
        const persistenceMongoDBOrder = require("../dal/mongoose/dao/models/orderDao.mongoose.js");
        const {
          messagesRepositoryMoongose,
        } = require("../dal/mongoose/repositories/index.js");

        return {
          persistenceProduct: new persistenceMongoDBProduct(),
          persistenceUser: new persistenceMongoDBUser(),
          persistenceOrder: new persistenceMongoDBOrder(),
          persistenceMessages: messagesRepositoryMoongose,
        };


      /* PERSISTENCIA EN DEFAULT: MEMORIA */
      default:
        console.log("[Persistence] : Default => Memory");
        const persistenceDefaultProduct = require("../dal/memory/dao/models/productDao.memory.js");
        const persistenceDefaultUser = require("../dal/memory/dao/models/userDao.memory.js");
        const persistenceDefaultOrder = require("../dal/memory/dao/models/orderDao.memory.js");
        const messagesRepositoryIndex = require("../dal/memory/repositories/index.js");

        return {
          persistenceProduct: new persistenceDefaultProduct(),
          persistenceUser: new persistenceDefaultUser(),
          persistenceOrder: new persistenceDefaultOrder(),
          persistenceMessages: messagesRepositoryIndex.messagesRepository,
        };
    }
  };
}

module.exports = new PersistenceFactory();
