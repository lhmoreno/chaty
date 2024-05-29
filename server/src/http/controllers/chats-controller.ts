import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { chatsService } from "@/services/chats-service";
import { FastifyRedis } from "@fastify/redis";
import { ServerIO } from "@/app";
import { messagesService } from "@/services/messages-service";

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
        const contact = chat.users.find((i) => i.userId !== userId);
        const requester = chat.users.find((i) => i.userId === userId);

        return {
          id: chat.id,
          title: contact.user.name,
          unreadMessagesCount: requester.unreadMessagesCount,
        };
      }),
    };
  },

  async sendMesage(
    request: FastifyRequest,
    reply: FastifyReply,
    redis: FastifyRedis,
    io: ServerIO
  ) {
    const { chatId } = request.params as { chatId: string };
    const userId = request.cookies["@chaty:userId"];

    const createChatInBodySchema = z.object({
      text: z.string(),
    });

    const { text } = createChatInBodySchema.parse(request.body);

    if (!userId) {
      return { message: "Unthorized!" };
    }

    const chat = await chatsService.findOne(chatId);

    const usersIds = chat.users.map((user) => user.userId);

    if (!usersIds.includes(userId)) {
      return { message: "Unthorized!" };
    }

    let message = await messagesService.create({
      chatId,
      senderId: userId,
      text,
    });

    const toUserId = usersIds.find((id) => id !== userId);

    const { success } = await messagesService.send(
      redis,
      {
        message,
        toUserId,
      },
      io
    );

    if (success) {
      message = await messagesService.markAsReceive(message.id);
    }

    return {
      message,
    };
  },

  async markMessageAsRead(request: FastifyRequest, reply: FastifyReply) {
    const { messageId } = request.params as {
      chatId: string;
      messageId: string;
    };
    const userId = request.cookies["@chaty:userId"];

    if (!userId) {
      return { message: "Unthorized!" };
    }

    const message = await messagesService.markAsRead(messageId);

    return {
      message,
    };
  },
};
