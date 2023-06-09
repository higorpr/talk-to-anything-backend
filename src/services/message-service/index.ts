import { messages } from "@prisma/client";
import { messageRepository } from "repositories/message-repository";

async function postChatMessage(
	to: string,
	from: string,
	message: string
): Promise<messages> {
	return await messageRepository.postMessage(to, from, message);
}

async function generateAIResponse(toUser: string) {
	const message =
		"This is an automatic answer that is not yet connected to ChatGPT";
	const from = "TalkToAnything";

	return await messageRepository.postMessage(toUser, from, message);
}

async function retrieveChat(user: string): Promise<messages[]> {
	return await messageRepository.getMessages(user);
}

export const messageService = {
	postChatMessage,
	retrieveChat,
	generateAIResponse,
};
