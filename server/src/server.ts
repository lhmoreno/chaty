import Fastify, { FastifyInstance } from "fastify";
import fastifyIO from "fastify-socket.io";
import { Server } from "socket.io";

type Users = {
  [socketId: string]: string;
};

type MessageToSend = {
  to: string;
  text: string;
};

type MessageToReceive = {
  fromId: string;
  text: string;
};

declare module "fastify" {
  interface FastifyInstance {
    io: Server<{
      users: (users: Users) => void;
      "messages-to-send": (message: MessageToSend) => void;
      "messages-to-receive": (message: MessageToReceive) => void;
    }>;
  }
}

const users: Users = {};

const server: FastifyInstance = Fastify();

const start = async () => {
  try {
    await server.register(fastifyIO, {
      cors: {
        origin: "*",
      },
    });

    await server.listen({
      port: Number(process.env.PORT) || 3333,
    });

    console.log("Server is running!");

    server.io.on("connection", (socket) => {
      const id = String(socket.id);

      users[id] = String(socket.handshake.query.nickname);

      server.io.emit("users", users);

      socket.on("messages-to-send", (message) => {
        socket.to(message.to).emit("messages-to-receive", {
          fromId: id,
          text: message.text,
        });
      });

      socket.on("disconnect", () => {
        delete users[id];

        server.io.emit("users", users);
      });
    });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
