// import { messages } from "@prisma/client";
import { messages } from "prisma/prisma-client";
import { prisma } from "../../config/db";

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

async function getMessages(userName: string): Promise<messages[]> {
	return await prisma.messages.findMany({
		where: {
			OR: [
				{
					from: {
						equals: userName,
					},
				},
				{
					to: {
						equals: userName,
					},
				},
			],
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
