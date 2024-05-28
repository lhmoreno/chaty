import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { chatsService } from "@/services/chats-service";

export const chatsController = {
  async create(request: FastifyRequest, reply: FastifyReply) {
    const userId = request.cookies["@chaty:userId"];

    if (!userId) {
      return { message: "Unthorized!" };
    }

    const createChatInBodySchema = z.object({
      receiverId: z.string(),
    });

    const { receiverId } = createChatInBodySchema.parse(request.body);

    const chat = await chatsService.create([userId, receiverId]);

    return reply.status(201).send({ chat });
  },

  async findOne(request: FastifyRequest, reply: FastifyReply) {
    const { chatId } = request.params as { chatId: string };
    const userId = request.cookies["@chaty:userId"];

    if (!userId) {
      return { message: "Unthorized!" };
    }

    const chat = await chatsService.findOne(chatId);

    if (!chat.users.some((user) => user.userId === userId)) {
      return { message: "Unthorized!" };
    }

    return {
      chat: {
        id: chat.id,
        messages: chat.messages,
      },
    };
  },

  async findMany(request: FastifyRequest, reply: FastifyReply) {
    const userId = request.cookies["@chaty:userId"];

    if (!userId) {
      return { message: "Unthorized!" };
    }

    const chats = await chatsService.findManyByUserId(userId);

    return {
      chats: chats.map((chat) => {
        const userIndex = chat.users.findIndex(
          (user) => user.userId !== userId
        );

        return {
          id: chat.id,
          userId: chat.users[userIndex].userId,
        };
      }),
    };
  },
};
