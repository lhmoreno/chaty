import { prismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { Prisma } from "@prisma/client";

export const usersService = {
  async create(data: Prisma.UserCreateInput) {
    const user = await prismaUsersRepository.create(data);

    return user;
  },

  async findAllWithoutRequester(userId: string) {
    const users = await prismaUsersRepository.findAll();

    const usersWithoutRequester = users
      .filter((user) => user.id !== userId)
      .map((user) => ({
        id: user.id,
        name: user.name,
      }));

    return usersWithoutRequester;
  },
};
