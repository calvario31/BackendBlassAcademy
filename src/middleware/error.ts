import { FastifyError, FastifyReply, FastifyRequest } from "fastify";

export default function (
  err: FastifyError,
  req: FastifyRequest,
  reply: FastifyReply,
) {
  if (err.statusCode === 401) {
    if (err.mensaje === "Usuario/Clave incorrectas") {
      reply.code(401).send({ mensaje: "Usuario/Clave incorrectas" });
    } else {
      reply.code(401).send({ mensaje: "No autorizado" });
    }
    return;
  }
  if (err.statusCode === 400 && err.code === "FST_ERR_CTP_EMPTY_JSON_BODY") {
    reply.code(400).send({ mensaje: "Por favor, agregar un payload" });
    return;
  }
  reply.send(err);
}
