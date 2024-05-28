import fastifyCookie from "@fastify/cookie";
import fastify from "fastify";
import { ZodError } from "zod";
import { env } from "@/env";
import { usersRoutes } from "@/http/routes/users-routes";
import { chatsRoutes } from "@/http/routes/chats-routes";
import { Server } from "socket.io";
import { socketServer } from "./socket/socket-server";

declare module "fastify" {
  interface FastifyInstance {
    io: Server<{
      "new-message": () => void;
    }>;
  }
}

export const app = fastify();

app.register(socketServer);
app.register(fastifyCookie);

app.register(usersRoutes);
app.register(chatsRoutes);

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: "Validation error.", issues: error.format() });
  }

  if (env.NODE_ENV !== "production") {
    console.error(error);
  } else {
    // TODO: Here we should log to a external tool like DataDog/NewRelic/Sentry
  }

  return reply.status(500).send({ message: "Internal server error." });
});
