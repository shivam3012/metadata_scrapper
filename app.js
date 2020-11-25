const express = require("express");
const app = express();
const Utility = require('./src/utility/util');
const httpStatus = require("./src/exceptions/httpStatusCodes.json");
const path = require("path");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");
const i18n = require("i18n");
const routes = require("./src/router/index.route");
require("./src/config/config");

if (AppConfig.ENV === "development") {
  app.use(morgan("dev"));
}

// setup some locales - other locales default to the first locale
i18n.configure({
  locales: "en",
  directory: __dirname + "/src/locales",
  updateFiles: false,
  objectNotation: true
});

app.use(function (req, res, next) {
  i18n.init(req, res);
  next();
});

app.use("/static", express.static(path.join(__dirname, "/public")));

// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

// mount all routes on /api path
app.use("/api", routes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = {
    message: "404 Not found",
    status: httpStatus.NOT_FOUND
  }
  next(err);
});

app.use((err, req, res, next) => {
  if (AppConfig.ENV != "production") {
    console.error("Error is::", err);
  }
  return Utility.response(
    res,
    {},
    err.resMsg,
    err.status || httpStatus.INTERNAL_SERVER_ERROR,
    {
      msg: err.message || err.resMsg
    },
  );
});

// listen on port AppConfig.port
app.listen(AppConfig.PORT, () => {
  console.info(`server started on port: ${AppConfig.PORT} (${AppConfig.ENV})`); // eslint-disable-line no-console
});


module.exports = app;
