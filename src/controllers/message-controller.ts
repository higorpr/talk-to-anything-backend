import { Request, Response } from "express";
import { messageService } from "../services/message-service";

export async function generateResponse(req: Request, res: Response) {
	/*
        Receives an user message, generates and returns the chatGPT response to that message
    */

	const { message } = req.body;

	try {
		console.log("Entrei aqui");
		const gptResponse = await messageService.generateAIResponse(message);
		console.log(gptResponse);
		return res.status(201).send(gptResponse);
	} catch (err) {
		console.log(err);
		return res.status(500).send(err);
	}
}

export async function getChat(req: Request, res: Response) {
	/*
        Retrieve chat messages between user and chatGPT ordered by time
    */

	const { user } = req.params;
	try {
		const chatHistory = await messageService.retrieveChat(user);
		return res.status(200).send(chatHistory);
	} catch (err) {
		console.log(err);
		return res.status(500).send(err);
	}
}
