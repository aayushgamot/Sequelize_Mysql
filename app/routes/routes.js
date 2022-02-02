let express = require("express");
let router = express.Router();

const userRoutes = require("./router/userRoutes");
const addressRoutes = require("./router/addressRoutes");

router.use("/", userRoutes);
router.use("/", addressRoutes);

module.exports = router;
