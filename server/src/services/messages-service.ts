import { ServerIO } from "@/app";
import {
  CreateMessageInput,
  prismaMessagesRepository,
} from "@/repositories/prisma/prisma-messages-repository";
import { redisUsersRepository } from "@/repositories/redis/redis-users-repository";
import { FastifyRedis } from "@fastify/redis";
import { Message } from "@prisma/client";

type SendMessage = {
  message: Message;
  toUserId: string;
};

export const messagesService = {
  async create(data: CreateMessageInput) {
    const message = await prismaMessagesRepository.create(data);

    return message;
  },

  async markAsReceive(id: string) {
    const message = await prismaMessagesRepository.update(id, {
      status: "RECEIVE",
    });

    return message;
  },

  async markAsRead(id: string) {
    const message = await prismaMessagesRepository.update(id, {
      status: "READ",
    });

    return message;
  },

  async send(redis: FastifyRedis, data: SendMessage, io: ServerIO) {
    let success = false;

    const socketId = await redisUsersRepository(redis).checkUserIsOnline(
      data.toUserId
    );

    if (socketId) {
      success = io.to(String(socketId)).emit("new-message", data.message);
    }

    return { success };
  },
};
