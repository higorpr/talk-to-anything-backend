"use strict";
exports.__esModule = true;
exports.messageRouter = void 0;
var message_controller_1 = require("../controllers/message-controller");
var express_1 = require("express");
var messageRouter = (0, express_1.Router)();
exports.messageRouter = messageRouter;
messageRouter.post("/", message_controller_1.generateResponse).get("/:user", message_controller_1.getChat);
