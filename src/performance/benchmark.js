const autocannon = require("autocannon");
const { PassThrough } = require("stream");
const { loggerTrace } = require("../logger/log4js.js");

const run = (url) => {
  const buf = [];
  const outputStream = new PassThrough();

  const inst = autocannon({
    url,
    connections: 100,
    duration: 20,
  });

  autocannon.track(inst, { outputStream });

  outputStream.on("data", (data) => buf.push(data));
  inst.on("done", () => {
    process.stdout.write(Buffer.concat(buf));
  });
  loggerTrace.trace("Running all benchmarks in");
};

run("http://localhost:8080/info");
