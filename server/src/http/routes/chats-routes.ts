import { FastifyInstance } from "fastify";
import { chatsController } from "../controllers/chats-controller";

export async function chatsRoutes(app: FastifyInstance) {
  app.post("/chats", chatsController.create);
  app.get("/chats", chatsController.findMany);
  app.get("/chats/:chatId", chatsController.findOne);
}
