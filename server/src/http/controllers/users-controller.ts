import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { usersService } from "@/services/users-service";

export const usersController = {
  async create(request: FastifyRequest, reply: FastifyReply) {
    const createUserInBodySchema = z.object({
      name: z.string(),
    });

    const { name } = createUserInBodySchema.parse(request.body);

    const user = await usersService.create({
      name,
    });

    return reply
      .setCookie("@chaty:userId", user.id, {
        path: "/",
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .status(201)
      .send();
  },

  async find(request: FastifyRequest, reply: FastifyReply) {
    const userId = request.cookies["@chaty:userId"];

    if (!userId) {
      return { message: "Unthorized!" };
    }

    const users = await usersService.findAllWithoutRequester(userId);

    return { users };
  },

  async update(request: FastifyRequest, reply: FastifyReply) {
    const userId = request.cookies["@chaty:userId"];

    const createUserInBodySchema = z.object({
      name: z.string(),
    });

    const { name } = createUserInBodySchema.parse(request.body);

    if (!userId) {
      return { message: "Unthorized!" };
    }

    const user = await usersService.update(userId, { name });

    return { user };
  },
};
