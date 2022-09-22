const express = require("express");

const app = express();

const http = require("http").Server(app);

const io = require("socket.io")(http);

const handlebars = require("express-handlebars");

const cors = require("cors");
app.use(cors());

const compression = require("compression");
app.use(compression());

const multer = require("multer");
const storageMulter = multer.diskStorage({
  destination: "public/avatar",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
app.use(
  multer({
    storage: storageMulter,
    dest: "public/avatar",
  }).single("avatar")
);

const passport = require("passport");

const session = require("express-session");

const cookieParser = require("cookie-parser");

const MongoStore = require("connect-mongo");

const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };

const {
  MONGO_URI,
  SECRET_SESSION,
  EXPIRATION_SESSION,
} = require("./src/config/globals.js");
const sessionMiddleware = session({
  store: MongoStore.create({
    mongoUrl: MONGO_URI,
    mongoOptions: advancedOptions,
    ttl: 600,
  }),
  secret: SECRET_SESSION,
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: Number(EXPIRATION_SESSION),
  },
});

app.use(sessionMiddleware);
app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session());

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.engine(
  "hbs",
  handlebars({
    extname: "hbs",
    defaultLayout: "main.hbs",
    layoutsDir: `./views/layouts`,
    partialsDir: `./views/partials/`,
  })
);
app.set("view engine", "hbs");
app.set("views", "./views");

app.use("/static", express.static(__dirname + "/public"));

const routesConfig = require("./src/routes/index.js");
routesConfig(app);

const socketConnection = require("./src/services/messagesIOchat.js");
socketConnection(io, sessionMiddleware);

app.get("*", (req, res, next) => {
  res.status(404).render("./pages/not-founded");
});

module.exports = http;
