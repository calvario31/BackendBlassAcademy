import { FastifyInstance } from "fastify";
import {
  getAll,
  getById,
  create,
  patch,
  deleteById,
  update,
} from "../controllers/products";

export default async function routes(fastify: FastifyInstance) {
  fastify.get("/products", getAll);
  fastify.get("/products/:id", getById);
  fastify.post("/products", create);
  fastify.put("/products/:id", update);
  fastify.patch("/products/:id", patch);
  fastify.delete("/products/:id", deleteById);
}
