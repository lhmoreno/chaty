import { FastifyInstance } from "fastify";
import { usersController } from "../controllers/users-controller";

export async function usersRoutes(app: FastifyInstance) {
  app.post("/users", usersController.create);
  app.get("/users", usersController.find);
  app.put("/users", usersController.update);
}
