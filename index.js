const path = require("path");
require("dotenv").config({
  path: path.resolve(__dirname, process.env.NODE_ENV + ".env"),
});

const { getConnection } = require("./src/dal/mongoose/db/connectionMongo.js");

const http = require("./server");
const cluster = require("cluster");
const numCPUs = require("os").cpus().length;
const { IS_CLUSTER, PORT } = require("./src/config/globals.js");

if (IS_CLUSTER.toLowerCase() === "true") {
  console.log("Server mode: CLUSTER");

  if (cluster.isMaster) {
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }

    cluster.on("exit", (worker) => {
      console.log(
        `Worker ${
          worker.process.pid
        } DIED at ${new Date().toLocaleDateString()}!`
      );
    });
  } else {
    getConnection()
      .then((msg) => {
        console.log(msg);
        http.listen(PORT, () =>
          console.log(`Working on ${PORT}! and procces id ${process.pid}`)
        );
      })
      .catch((err) => console.log(err));
  }
} else {
  console.log("Server mode: FORK");
  getConnection()
    .then((msg) => {
      console.log(msg);
      http.listen(PORT, () =>
        console.log(
          `Working on http://localhost:${PORT} and procces id ${process.pid}!`
        )
      );
    })
    .catch((err) => console.log(err));
}
