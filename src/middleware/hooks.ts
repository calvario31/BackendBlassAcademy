import { FastifyInstance } from "fastify";
import { Readable } from "stream";

export default function hooks(fastify: FastifyInstance) {
  fastify.addHook("preParsing", (req, reply, payload, done) => {
    if (
      req.method === "DELETE" &&
      req.headers["content-type"] === "application/json"
    ) {
      done(null, Readable.from(["{}"]));
    } else {
      done(null, payload);
    }
  });
}
