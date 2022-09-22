const nodemailer = require("nodemailer");
const { GMAIL_USER, GMAIL_USER_PASS } = require("../config/globals.js");

const transporterEthereal = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "olaf.spencer99@ethereal.email",
    pass: "Bmhw71bhgRbpYy2QgR",
  },
});

const transporterGmail = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: GMAIL_USER,
    pass: GMAIL_USER_PASS,
  },
});

const transporter = {
  transporterGmail: transporterGmail,
  transporterEthereal: transporterEthereal,
};

module.exports = transporter;
