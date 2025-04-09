import { FastifyInstance } from "fastify";
import { getAll, getById, create, update, deleteById } from "../controllers/products";

export default async function routes(fastify: FastifyInstance) {
  fastify.get("/products", getAll);
  fastify.get("/products/:id", getById);
  fastify.post("/products", create);
  fastify.patch("/products/:id", update);
  fastify.delete("/products/:id", deleteById);
}
