const {
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  TWILIO_NUMBER,
} = require("../config/globals.js");

const client = require("twilio")(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

const {
  loggerWarn,
  loggerTrace,
  loggerDefault,
  loggerError,
} = require("../logger/log4js.js");

module.exports = {
  twilioSmsChat: (user, text) => {
    client.messages
      .create({
        body: `El usuario ${user} escribio administrador y el siguiente texto: ${text}`,
        from: TWILIO_NUMBER,
        to: "+543534244751",
      })
      .then((message) => loggerTrace.trace(message.sid))
      .catch(loggerError.error);
  },

  twilioSmsFinishBuy: (user, text) => {
    client.messages
      .create({
        body: `${user}, ${text}`,
        from: TWILIO_NUMBER,
        to: "+543534244751",
      })
      .then((message) => loggerTrace.trace(message.sid))
      .catch(loggerError.error);
  },
};
