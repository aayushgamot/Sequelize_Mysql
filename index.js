const express = require("express");
const app = express();

const db = require("./app/models/sequelize");

const dotenv = require("dotenv");
dotenv.config();

const passport = require("passport");
const pass = require("./app/middleWares/passport");

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const routes = require("./app/routes/routes");
app.use("/", routes);

const logger = require("./app/logger/logger");
app.use(require("./app/middleWares/response"));
app.use(require("./app/middleWares/error").handleJoiErrors);
app.use(require("./app/middleWares/error").handleErrors);

const port = process.env.PORT || 8000;
app.listen(port, () => logger.info(`Listening on port ${port}...`));
