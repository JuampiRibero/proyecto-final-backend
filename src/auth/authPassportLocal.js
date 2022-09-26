const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { createHash, isValidPassword } = require("./bcrypt/bcrypt.js");
const { PERSISTENCE } = require("../config/globals.js");
const persistenceFactory = require("../dal/factory.js");
let { persistenceUser } = persistenceFactory.newPersistence(PERSISTENCE);
const { loggerError } = require("../logger/log4js.js");

passport.use(
  "local-login",
  new LocalStrategy(
    {
      passReqToCallback: true,
      usernameField: "email",
      passwordField: "password",
    },
    async function (req, username, password, done) {
      try {
        const userFinded = await persistenceUser.findUserByEmail({
          email: req.body.email,
        });
        if (!userFinded) {
          loggerError.error("No se encontró usuario");
          return done(
            null,
            false,
            loggerError.error("mensaje", "Usuario no encontrado")
          );
        }
        if (!isValidPassword(req.body.password, userFinded.password)) {
          loggerError.error("Contraseña incorrecta");
          return done(
            null,
            false,
            loggerError.error("mensaje", "Usuario o contraseña incorrecta")
          );
        }
        return done(null, userFinded);
      } catch (error) {
        loggerError.error(error);
      }
    }
  )
);

passport.use(
  "signup-local",
  new LocalStrategy(
    {
      passReqToCallback: true,
      usernameField: "email",
      passwordField: "password",
    },
    async function (req, username, password, done) {
      try {
        const userFinded = await persistenceUser.findUserByEmail({
          email: req.body.email,
        });
        if (userFinded) {
          return done(
            null,
            false,
            loggerError.error(
              "mensaje",
              "Hay un usuario registrado con su mail"
            )
          );
        } else {
          const userToCreate = {
            name: req.body.name,
            lastname: req.body.lastname,
            age: req.body.age,
            number: req.body.number,
            address: req.body.address,
            email: req.body.email,
            avatar: `/static/avatar/${req.file.filename}`,
            password: createHash(req.body.password),
          };
          await persistenceUser.createUser(userToCreate);
          return done(null, userToCreate);
        }
      } catch (err) {
        loggerError.error(err);
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(async function (id, done) {
  try {
    const userFinded = persistenceUser.findUserById(id);
    return done(null, userFinded);
  } catch (err) {
    loggerError.error(err);
  }
});

module.exports = passport;
