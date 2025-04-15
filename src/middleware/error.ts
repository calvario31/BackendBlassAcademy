import { FastifyError, FastifyReply, FastifyRequest } from "fastify";

export default function (
  err: FastifyError,
  req: FastifyRequest,
  reply: FastifyReply,
) {
  if (err.statusCode === 401) {
    reply.code(401).send({ message: "No autorizado" });
    return;
  }
  reply.send(err);
}
