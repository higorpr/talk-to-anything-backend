import { Request, Response } from "express";
import { messageService } from "services/message-service";

export async function generateResponse(req: Request, res: Response) {
	/*
        Receives and saves the user message into the database, generates chatGPT response, saves response into database
    */

	const { user, message } = req.body;
	const chat = "TalkToAnything";

	try {
		await messageService.postChatMessage(chat, user, message);
		await messageService.generateAIResponse(user);
		return res.sendStatus(201);
	} catch (err) {
		console.log(err);
	}
}

export async function getChat(req: Request, res: Response) {
	/*
        Retrieve chat messages between user and chatGPT ordered by time
    */

	const { user } = req.body;
	try {
		const chatHistory = await messageService.retrieveChat(user);
		return res.status(200).send(chatHistory);
	} catch (err) {
		console.log(err);
	}
}
