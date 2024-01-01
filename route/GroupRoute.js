const express = require("express");
const groupRoute = express.Router();
const { createGroup, getCreatedGroup } = require("../controller/GroupCtrl");
const isLogin = require("../middleware/Auth");

groupRoute.post("/createGroup", isLogin, createGroup);
groupRoute.get("/getCreatedGroup", isLogin, getCreatedGroup);

module.exports = groupRoute;
