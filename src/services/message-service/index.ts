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

async function generateAIResponse(toUser: string, userMessage: string) {
	const apiEndpoint = process.env.OPENAI_ENDPOINT;
	const headers = {
		"Content-Type": "application/json",
		Authorization: `Bearer ${process.env.OPENAI_KEY}`,
	};

	const data = {
		model: "gpt-3.5-turbo",
		messages: [{ role: "user", content: userMessage }],
	};

	const ChatResponse = await axios.post(apiEndpoint, data, { headers });
	const ChatAnswer = ChatResponse.data.choices[0].message.content;

	const from = "TalkToAnything";

	return await messageRepository.postMessage(toUser, from, ChatAnswer);
}

async function retrieveChat(user: string): Promise<messages[]> {
	return await messageRepository.getMessages(user);
}

export const messageService = {
	postChatMessage,
	retrieveChat,
	generateAIResponse,
};
