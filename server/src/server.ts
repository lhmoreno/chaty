import { app } from "./app";
import { env } from "./env";
import { socketServer } from "./socket/socket-server";
import fastifyIO from "fastify-socket.io";

import { usersRoutes } from "@/http/routes/users-routes";
import { chatsRoutes } from "@/http/routes/chats-routes";

async function start() {
  await app.register(fastifyIO, {
    cors: {
      origin: "*",
    },
  });
  await app.register(socketServer);

  app.register(usersRoutes);
  app.register(chatsRoutes);

  await app.listen({
    host: "0.0.0.0",
    port: env.PORT,
  });

  console.log("🚀 HTTP Server Running!");
}

start();
