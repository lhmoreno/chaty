import fastifyCookie from "@fastify/cookie";
import fastify from "fastify";
import { ZodError } from "zod";
import { env } from "@/env";
import { Server } from "socket.io";
import fastifyRedis from "@fastify/redis";
import cors from "@fastify/cors";
import { Message } from "@prisma/client";

export type SocketProps = {
  "new-message": (message: Message) => void;
};

export type ServerIO = Server<SocketProps>;

declare module "fastify" {
  interface FastifyInstance {
    io: ServerIO;
  }
}

export const app = fastify();

app.register(fastifyRedis, {
  url: env.REDIS_URL,
});
app.register(fastifyCookie);
app.register(cors, {
  origin: "http://localhost:3000",
  credentials: true,
});

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
