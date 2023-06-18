import { messageRepository } from "../../repositories/message-repository";
import { messages } from "prisma/prisma-client";
import axios from "axios";

async function postChatMessage(
	to: string,
	from: string,
	message: string
): Promise<messages> {
	return await messageRepository.postMessage(to, from, message);
}

async function generateAIResponse(userMessage: string) {
	const apiEndpoint = process.env.OPENAI_ENDPOINT;
	const headers = {
		"Content-Type": "application/json",
		Authorization: `Bearer ${process.env.OPENAI_KEY}`,
	};

	const data = {
		model: "gpt-3.5-turbo",
		messages: [{ role: "user", content: userMessage }],
	};

	const chatResponse = await axios.post(apiEndpoint, data, { headers });
	const chatAnswer = chatResponse.data.choices[0].message.content;

	return chatAnswer;
}

async function retrieveChat(user: string): Promise<messages[]> {
	return await messageRepository.getMessages(user);
}

export const messageService = {
	postChatMessage,
	retrieveChat,
	generateAIResponse,
};
