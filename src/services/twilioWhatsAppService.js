const {
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  TWILIO_NUMBER_WHATSAPP,
} = require("../config/globals.js");

const client = require("twilio")(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

const { loggerDefault ,loggerError } = require("../logger/log4js.js");

module.exports = (text, number) => {
  client.messages
    .create({
      body: text,
      from: `whatsapp:${TWILIO_NUMBER_WHATSAPP}`,
      to: `whatsapp:${number}`,
    })
    .then((message) => loggerDefault.info(message.sid))
    .catch(loggerError.error);
};
