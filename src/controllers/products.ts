import { FastifyRequest, FastifyReply } from "fastify";
import { findAll, findBy } from "@src/services/getProducts";
import { randomId } from "@src/utilities/idGenerator";

function isEmptyPayload(body: any) {
  return !body || Object.keys(body).length === 0;
}

function emptyPayloadResolver(reply: FastifyReply) {
  return reply.code(400).send({ message: "Debe especificar un payload" });
}

function notFoundResolver(reply: FastifyReply) {
  return reply.status(404).send();
}

export async function getAll(request: FastifyRequest, reply: FastifyReply) {
  return findAll(request.query);
}

export async function getById(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };
  const product = findBy(id);

  if (!product) return notFoundResolver(reply);

  return product;
}

export async function create(request: FastifyRequest, reply: FastifyReply) {
  if (isEmptyPayload(request.body)) {
    return emptyPayloadResolver(reply);
  }

  return reply.code(201).send({
    ...(request.body as any),
    id: randomId(),
  });
}

export async function update(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };
  const product = findBy(id);

  if (!product) return notFoundResolver(reply);

  if (isEmptyPayload(request.body)) {
    return emptyPayloadResolver(reply);
  }

  return {
    ...(request.body as any),
    id,
  };
}

export async function patch(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };
  const product = findBy(id);

  if (!product) return notFoundResolver(reply);

  if (isEmptyPayload(request.body)) {
    return emptyPayloadResolver(reply);
  }

  return {
    ...product,
    ...(request.body as any),
  };
}

export async function deleteById(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };
  const product = findBy(id);

  if (!product) return notFoundResolver(reply);

  return {
    message: `Producto con id ${id} se ha eliminado satisfactoriamente`,
  };
}
