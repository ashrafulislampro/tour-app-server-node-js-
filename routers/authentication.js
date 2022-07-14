const express = require("express");
const jwtToken = require("../utilities/jwtToken");

const router = express.Router();

router.post("/get-token", jwtToken.getToken);

module.exports = router;
