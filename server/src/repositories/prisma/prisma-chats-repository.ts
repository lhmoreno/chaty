import { prisma } from "@/lib/prisma";

export const prismaChatsRepository = {
  async create(usersIds: [string, string]) {
    const chat = await prisma.chat.create({
      data: {
        users: {
          create: [
            {
              userId: usersIds[0],
            },
            {
              userId: usersIds[1],
            },
          ],
        },
      },
    });

    return chat;
  },

  async findManyByUserId(userId: string) {
    const chats = await prisma.chat.findMany({
      where: {
        users: {
          some: {
            userId,
          },
        },
      },
      include: {
        users: {
          include: {
            user: true,
          },
        },
      },
    });

    return chats;
  },

  async findOne(id: string) {
    const chat = await prisma.chat.findUnique({
      where: {
        id,
      },
      include: {
        messages: true,
        users: true,
      },
    });

    return chat;
  },
};
