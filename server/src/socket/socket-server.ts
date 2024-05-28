import { FastifyInstance } from "fastify";
import fastifyIO from "fastify-socket.io";

export async function socketServer(app: FastifyInstance) {
  await app.register(fastifyIO, {
    cors: {
      origin: "*",
    },
  });

  app.io.on("connection", (socket) => {
    const id = String(socket.id);

    console.log("✅ User connect: ID -", id);

    socket.on("disconnect", () => {
      console.log("🛑 User disconnct: ID -", id);
    });
  });
}
