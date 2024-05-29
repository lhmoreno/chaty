import { FastifyInstance } from "fastify";
import { chatsController } from "../controllers/chats-controller";

export async function chatsRoutes(app: FastifyInstance) {
  app.post("/chats", chatsController.create);
  app.get("/chats", chatsController.findMany);
  app.get("/chats/:chatId", chatsController.findOne);
  app.post("/chats/:chatId/sendMessage", (req, rep) =>
    chatsController.sendMesage(req, rep, app.redis, app.io)
  );
  app.patch(
    "/chats/:chatId/markMessageAsRead/:messageId",
    chatsController.markMessageAsRead
  );
}
