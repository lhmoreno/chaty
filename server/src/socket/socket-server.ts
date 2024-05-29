import { FastifyInstance } from "fastify";
import { auth } from "./middlewares/auth";
import { redisUsersRepository } from "@/repositories/redis/redis-users-repository";

export async function socketServer(app: FastifyInstance) {
  app.io.use(auth);

  app.io.on("connection", async (socket) => {
    const userId = socket.handshake.auth.userId as string;
    const id = String(socket.id);

    await redisUsersRepository(app.redis).setWithOnline(userId, id);

    console.log(`✅ User ${userId} connected`);

    socket.on("disconnect", async () => {
      await redisUsersRepository(app.redis).setWithNotOnline(userId);

      console.log(`🛑 User ${userId} disconnected`);
    });
  });
}
