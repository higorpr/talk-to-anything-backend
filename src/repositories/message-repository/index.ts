// import { messages } from "@prisma/client";
import { messages } from "prisma/prisma-client";
import { prisma } from "../../config/db";

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
	getMessages,
};
