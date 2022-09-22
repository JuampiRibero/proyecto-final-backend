const mailingService = require("../services/mailingService.js");
const passportLocal = require("../auth/authPassportLocal.js");

exports.signUpLocal = passportLocal.authenticate("signup-local", {
  failureRedirect: "/failsignup",
});

exports.signUpLocalCallback = async (req, res, next) => {
  const date = new Date().toLocaleDateString();
  const time = new Date().toLocaleTimeString();
  const mailOptions = {
    from: "Servidor de Node.js",
    to: ["olaf.spencer99@ethereal.email", process.env.GMAIL_USER],
    subject: `Nuevo usuario registrado: ${req.body.email} @ ${date} a las ${time}`,
    html: `El usuario ${req.body.email} se ha registrado el día ${date} a las ${time}. 
    Datos ingresados:
    - Nombre ${req.body.name}
    - Apellido ${req.body.lastname}
    - Edad ${req.body.age}
    - Número de contacto ${req.body.number}
    - Dirección ${req.body.address}
    - Email ${req.body.email}
    - Avatar ${req.body.avatar}`,

    attachments: [
      {
        path: req.session.passport.user.photo,
      },
    ],
  };
  mailingService.mailingEthereal(mailOptions);
  mailingService.mailingGmail(mailOptions);
  res.redirect("/login");
};

exports.logIn = passportLocal.authenticate("local-login", {
  failureRedirect: "/faillogin",
});

exports.logInCallback = async (req, res, next) => {
  res.redirect("/productos/vista");
};

exports.logOut = async (req, res, next) => {
  const date = new Date().toLocaleDateString();
  const time = new Date().toLocaleTimeString();
  const mailOptions = {
    from: "Servidor de Node.js",
    to: ["olaf.spencer99@ethereal.email", req.session.passport.user.email],
    subject: `El usuario ${req.session.passport.user.email} se deslogueo el día ${date} a las ${time}`,
    html: `<h2>${req.session.passport.user.name} ${req.session.passport.user.lastname} se ha deslogueado el día ${date} a las ${time}</h2>`,
    attachments: [
      {
        path: req.session.passport.user.avatar,
      },
    ],
  };
  mailingService.mailingEthereal(mailOptions);
  mailingService.mailingGmail(mailOptions);
  req.session.destroy();
  res.clearCookie("isRegistered");
  res.redirect("/goodbye");
};
