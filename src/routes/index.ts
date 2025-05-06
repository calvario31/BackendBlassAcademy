import { FastifyInstance } from "fastify";
import { MainController } from "@src/controllers/MainController";
import {
  animalsController,
  participantsController,
  productsController,
  videogamesController,
} from "@src/controllers";
import { basicAuth, bearerAuth } from "@src/middleware/auth";

export function routeGenerator(prefix?: string) {
  let root = prefix ? `${prefix}/` : "";
  return (fastify: FastifyInstance) => {
    registerRoutes(fastify, `${root}animales`, animalsController);
    registerRoutes(fastify, `${root}participantes`, participantsController);
    registerRoutes(fastify, `${root}productos`, productsController);
    registerRoutes(fastify, `${root}videojuegos`, videogamesController);
  };
}

export async function basicRoutes(fastify: FastifyInstance) {
  await basicAuth(fastify);
  routeGenerator("basic")(fastify);
}

export async function bearerRoutes(fastify: FastifyInstance) {
  await bearerAuth(fastify);
  routeGenerator("auth")(fastify);
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
