import { messages } from "@prisma/client";
import { prisma } from "config/db";

async function postMessage(
	to: string,
	from: string,
	message: string
): Promise<messages> {
	return await prisma.messages.create({
		data: {
			to: to,
			from: from,
			text: message,
		},
	});
}

async function getMessages(from: string): Promise<messages[]> {
	return await prisma.messages.findMany({
		where: {
			from: from,
		},
		orderBy: {
			createdAt: "asc",
		},
	});
}

export const messageRepository = {
	postMessage,
	getMessages,
};
