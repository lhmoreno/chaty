import { prisma } from "@/lib/prisma";
import { MessageStatus } from "@prisma/client";

export type CreateMessageInput = {
  text: string;
  chatId: string;
  senderId: string;
};

export type UpdateMessageInput = {
  status?: MessageStatus;
};

export const prismaMessagesRepository = {
  async create(data: CreateMessageInput) {
    const message = await prisma.message.create({
      data,
    });

    return message;
  },

  async update(id: string, data: UpdateMessageInput) {
    const message = await prisma.message.update({
      where: {
        id,
      },
      data,
    });

    return message;
  },
};
