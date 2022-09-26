/*Con yargs escuchamos en que puerto se levanta la App. Si es undefined se asignará el puerto 8080*/
const {
  portCLI,
  mongouriCLI,
  notifyMailEtherealCLI,
  passMailEtherealCLI,
  notifyMailCLI,
  passMailCLI,
  expirationSessionCLI,
  persistenceCLI,
} = require("yargs").argv;

/*Valores que pueden llegar a entrar por CLI, si no entran se establecen por defecto*/
const PORT_MANUAL = portCLI === undefined ? process.env.PORT : portCLI;
const MONGOURI =
  mongouriCLI === undefined ? process.env.MONGO_URI : mongouriCLI;
const ETHEREALNOTIFYMAIL = 
  notifyMailEtherealCLI === undefined ? process.env.ETHEREAL_USER : notifyMailEtherealCLI;
const ETHEREALPASSMAIL =
  expirationSessionCLI === undefined
    ? process.env.ETHEREAL_USER_PASS
    : passMailEtherealCLI;
const NOTIFYMAIL =
  notifyMailCLI === undefined ? process.env.GMAIL_USER : notifyMailCLI;
const PASSMAIL =
  expirationSessionCLI === undefined
    ? process.env.GMAIL_USER_PASS
    : passMailCLI;
const EXPIRATIONSESSION =
  expirationSessionCLI === undefined
    ? process.env.EXPIRATION_SESSION
    : expirationSessionCLI;
const PERSISTENCE =
  persistenceCLI === undefined ? process.env.PERSISTENCE : persistenceCLI;

module.exports = {
  NODE_ENV: process.env.NODE_ENV,
  MONGO_URI: MONGOURI,
  PORT: process.env.PORT || PORT_MANUAL,
  PERSISTENCE: PERSISTENCE,
  EXPIRATION_SESSION: EXPIRATIONSESSION,
  ETHEREAL_USER: ETHEREALNOTIFYMAIL,
  ETHEREAL_USER_PASS: ETHEREALPASSMAIL,
  GMAIL_USER: NOTIFYMAIL,
  GMAIL_USER_PASS: PASSMAIL,
  IS_CLUSTER: process.env.IS_CLUSTER,
  TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
  TWILIO_NUMBER: process.env.TWILIO_NUMBER,
  TWILIO_NUMBER_WHATSAPP: process.env.TWILIO_NUMBER_WHATSAPP,
  SECRET_SESSION: process.env.SECRET_SESSION,
};
