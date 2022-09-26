const path = require("path");
require("dotenv").config({
  path: path.resolve(__dirname, process.env.NODE_ENV + ".env"),
});

const { getConnection } = require("./src/dal/mongoose/db/connectionMongo.js");

const http = require("./server");
const cluster = require("cluster");
const numCPUs = require("os").cpus().length;
const { IS_CLUSTER, PORT } = require("./src/config/globals.js");

const { loggerDefault, loggerError } = require("./src/logger/log4js.js");

if (IS_CLUSTER.toLowerCase() === "true") {
  loggerDefault.info("Server mode: CLUSTER");

  if (cluster.isMaster) {
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }

    cluster.on("exit", (worker) => {
      loggerDefault.info(
        `Worker ${
          worker.process.pid
        } DIED at ${new Date().toLocaleDateString()}!`
      );
    });
  } else {
    getConnection()
      .then((msg) => {
        loggerDefault.info(msg);
        http.listen(PORT, () =>
          loggerDefault.info(`Working on ${PORT}! and procces id ${process.pid}`)
        );
      })
      .catch((err) => loggerError.error(err));
  }
} else {
  loggerDefault.info("Server mode: FORK");
  getConnection()
    .then((msg) => {
      loggerDefault.info(msg);
      http.listen(PORT, () =>
        loggerDefault.info(
          `Working on http://localhost:${PORT} and procces id ${process.pid}!`
        )
      );
    })
    .catch((err) => loggerError.error(err));
}
