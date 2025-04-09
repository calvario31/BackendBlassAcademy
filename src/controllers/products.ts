import { FastifyRequest, FastifyReply } from "fastify";
import products from "@src/resources/products.json";
import { randomId } from "@src/utilities/idGenerator";

function findBy(id: string) {
  return products.filter((p) => p.id.toString() === id)[0];
}

export async function getAll(request: FastifyRequest, reply: FastifyReply) {
  return products;
}

export async function getById(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };
  const product = findBy(id);

  if (!product) return reply.status(404).send();

  return product;
}

export async function create(request: FastifyRequest, reply: FastifyReply) {
  return {
    ...(request.body as any),
    id: randomId(),
  };
}

export async function update(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };
  const product = findBy(id);

  if (!product) return reply.status(404).send();

  return {
    ...(request.body as any),
    id,
  };
}

export async function patch(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };
  const product = findBy(id);

  if (!product) return reply.status(404).send();

  return {
    ...product,
    ...(request.body as any),
  };
}

export async function deleteById(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };
  const product = findBy(id);

  if (!product) return reply.status(404).send();
  return product;
}
