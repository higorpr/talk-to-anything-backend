import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { messageRouter } from "./routers";

dotenv.config();
const app = express();

app.use(json())
	.use(cors())
	.get("/health", (req, res) => res.send("Ok!"))
	.use("/chat", messageRouter);

export default app;