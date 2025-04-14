import { FastifyInstance } from "fastify";
import { MainController } from "@src/controllers/MainController";
import {
  animalsController,
  participantsController,
  productsController,
  videogamesController,
} from "@src/controllers";

export default async function routes(fastify: FastifyInstance) {
  routesBy(fastify, "animales", animalsController);
  routesBy(fastify, "participantes", participantsController);
  routesBy(fastify, "productos", productsController);
  routesBy(fastify, "videojuegos", videogamesController);
}

function routesBy(
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
