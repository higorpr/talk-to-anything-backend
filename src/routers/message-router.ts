import { generateResponse, getChat } from "../controllers/message-controller";
import { Router } from "express";

const messageRouter = Router();

messageRouter.post("/", generateResponse).get("/", getChat);

export { messageRouter };
