import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import fastifyAuth from "@fastify/auth";
import fastifyBasicAuth from "@fastify/basic-auth";
import bearerAuthPlugin from "@fastify/bearer-auth";

const secretKey = "secret-key";

export function login(fastify: FastifyInstance) {
  fastify.post("/auth/login", (req, reply) => {
    const { username, password } = req.body as any;
    if (!validateCredentials(username, password)) {
      return reply
        .code(401)
        .send({ message: "Usuario o contraseña incorrecta" });
    }
    return reply.code(200).send({ accessToken: secretKey });
  });
}

export async function auth(fastify: FastifyInstance) {
  await fastify
    .register(fastifyAuth)
    .register(fastifyBasicAuth, { validate })
    .register(bearerAuthPlugin, {
      addHook: false,
      keys: [secretKey],
      auth: validateKey,
    });
  fastify.decorate("allowUnauthenticated", noAuthenticated).addHook(
    "onRequest",
    fastify.auth(
      [
        fastify.allowUnauthenticated,
        fastify.basicAuth,
        fastify.verifyBearerAuth,
      ],
      {
        relation: "or",
      },
    ),
  );
}

function noAuthenticated(req: FastifyRequest, reply: FastifyReply, done) {
  if (!req.headers.auth) done();
  else done(new Error());
}

async function validate(
  username: string,
  password: string,
  req: FastifyRequest,
) {
  if (
    req.headers.auth === "basic" &&
    !validateCredentials(username, password)
  ) {
    return new Error("No autorizado");
  }
}

function validateKey(key: string, req: FastifyRequest) {
  return req.headers.auth === "bearer" && key === secretKey;
}

function validateCredentials(username: string, password: string) {
  return username === "standard_user" && password === "secret_blass_academy";
}
