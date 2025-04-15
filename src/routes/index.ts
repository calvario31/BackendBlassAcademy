import { FastifyInstance } from "fastify";
import { MainController } from "@src/controllers/MainController";
import {
  animalsController,
  participantsController,
  productsController,
  videogamesController,
} from "@src/controllers";
import { auth } from "@src/middleware/auth";

export default async function routes(fastify: FastifyInstance) {
  await auth(fastify);
  registerRoutes(fastify, "animales", animalsController);
  registerRoutes(fastify, "participantes", participantsController);
  registerRoutes(fastify, "productos", productsController);
  registerRoutes(fastify, "videojuegos", videogamesController);
}

function registerRoutes(
  fastify: FastifyInstance,
  resource: string,
  controller: MainController,
) {
  fastify.post(`/${resource}`, (req, reply) => controller.create(req, reply));
  fastify.get(`/${resource}`, (req, reply) => controller.getAll(req, reply));
  fastify.get(`/${resource}/:id`, (req, reply) =>
    controller.getById(req, reply),
  );
  fastify.put(`/${resource}/:id`, (req, reply) =>
    controller.update(req, reply),
  );
  fastify.patch(`/${resource}/:id`, (req, reply) =>
    controller.patch(req, reply),
  );
  fastify.delete(`/${resource}/:id`, (req, reply) =>
    controller.deleteById(req, reply),
  );
}
