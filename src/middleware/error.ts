import { FastifyError, FastifyReply, FastifyRequest } from "fastify";

export default function (
  err: FastifyError,
  req: FastifyRequest,
  reply: FastifyReply,
) {
  if (err.statusCode === 401) {
    if (err.message === "Usuario/Clave incorrectas") {
      reply.code(401).send({ message: "Usuario/Clave incorrectas" });
    } else {
      reply.code(401).send({ message: "No autorizado" });
    }
    return;
  }
  reply.send(err);
}
