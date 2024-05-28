import { prismaChatsRepository } from "@/repositories/prisma/prisma-chats-repository";

export const chatsService = {
  async create(usersIds: [string, string]) {
    const chat = await prismaChatsRepository.create(usersIds);

    return {
      id: chat.id,
    };
  },

  async findOne(chatId: string) {
    const chat = await prismaChatsRepository.findOne(chatId);

    return chat;
  },

  async findManyByUserId(userId: string) {
    const chat = await prismaChatsRepository.findManyByUserId(userId);

    return chat;
  },
};
