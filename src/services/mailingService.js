const {
  transporterEthereal,
  transporterGmail,
} = require("../mailing/nodemailerConfig.js");

const { loggerDefault, loggerError } = require("../logger/log4js.js");

exports.mailingEthereal = (mailOptions) => {
  transporterEthereal.sendMail(mailOptions, (err, info) => {
    if (err) {
      loggerError.error(err);
      return err;
    }
    loggerDefault.info(info);
  });
};

exports.mailingGmail = (mailOptions) => {
  transporterGmail.sendMail(mailOptions, (err, info) => {
    if (err) {
      loggerError.error(err);
      return err;
    }
    loggerDefault.info(info);
  });
};
