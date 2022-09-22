const {
  transporterEthereal,
  transporterGmail,
} = require("../mailing/nodemailerConfig.js");

exports.mailingEthereal = (mailOptions) => {
  transporterEthereal.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
      return err;
    }
    console.log(info);
  });
};

exports.mailingGmail = (mailOptions) => {
  transporterGmail.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
      return err;
    }
    console.log(info);
  });
};
