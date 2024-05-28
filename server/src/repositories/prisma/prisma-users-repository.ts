import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const prismaUsersRepository = {
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    });

    return user;
  },

  async findAll() {
    const users = await prisma.user.findMany();

    return users;
  },
};
