import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import fastifyAuth from "@fastify/auth";
import fastifyBasicAuth from "@fastify/basic-auth";
import bearerAuthPlugin from "@fastify/bearer-auth";
import { sign } from "jsonwebtoken";
import { getCache, setCache } from "./cache";

const secretKey = "secret-key";
const loginPayload = {
  id: 1,
  usuario: "standard_user",
  email: "standard-user@blass-academy.com",
  nombre: "Blass",
  apellido: "Academy",
  edad: 50,
};

export function login(fastify: FastifyInstance) {
  fastify.post("/auth/login", (req, reply) => {
    const { username, password } = req.body as any;
    if (!username || !password) {
      return reply.code(400).send();
    }
    if (!validateCredentials(username, password)) {
      return reply.code(401).send({ message: "Usuario/Clave incorrectas" });
    }
    const accessToken = sign({ ...loginPayload, i: "i" }, secretKey, {});
    setCache(accessToken);
    return reply
      .code(200)
      .send({ ...loginPayload, accessToken, refreshToken: accessToken });
  });
}

export async function basicAuth(fastify: FastifyInstance) {
  await fastify.register(fastifyAuth).register(fastifyBasicAuth, { validate });
  fastify.decorate("allowUnauthenticated", noAuthenticated).addHook(
    "onRequest",
    fastify.auth([fastify.allowUnauthenticated, fastify.basicAuth], {
      relation: "or",
    }),
  );
}

export async function bearerAuth(fastify: FastifyInstance) {
  await fastify.register(fastifyAuth).register(bearerAuthPlugin, {
    addHook: false,
    keys: [secretKey],
    auth: validateKey,
  });
  fastify.decorate("allowUnauthenticated", noAuthenticated).addHook(
    "onRequest",
    fastify.auth([fastify.allowUnauthenticated, fastify.verifyBearerAuth], {
      relation: "or",
    }),
  );
}

function noAuthenticated(req: FastifyRequest, reply: FastifyReply, done) {
  if (pathUnauthenticated(req.url)) done();
  else done(new Error());
}

async function validate(
  username: string,
  password: string,
  req: FastifyRequest,
) {
  if (
    !(req.url.includes("/basic") && validateCredentials(username, password))
  ) {
    return new Error("Usuario/Clave incorrectas");
  }
}

function validateKey(key: string, req: FastifyRequest) {
  return req.url.includes("/auth") && key === getCache();
}

function validateCredentials(username: string, password: string) {
  return username === "standard_user" && password === "secret_blass_academy";
}

function pathUnauthenticated(url: string) {
  return !url.includes("/basic") && !url.includes("/auth");
}
