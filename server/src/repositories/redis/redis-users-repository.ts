import { FastifyRedis } from "@fastify/redis";

export function redisUsersRepository(redis: FastifyRedis) {
  return {
    async setWithOnline(userId: string, socketId: string) {
      await redis.set(userId, socketId);
    },

    async setWithNotOnline(userId: string) {
      await redis.del(userId);
    },

    async checkUserIsOnline(userId: string) {
      const socketId = await redis.get(userId);

      return socketId;
    },
  };
}
