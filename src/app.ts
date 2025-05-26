import Fastify from "fastify";
import { basicRoutes, bearerRoutes, routeGenerator } from "./routes";
import error from "./middleware/error";
import { login } from "./middleware/auth";
import hooks from "./middleware/hooks";

const fastify = Fastify({ logger: true });

fastify.register(login);
hooks(fastify);
fastify.register(routeGenerator());
fastify.register(basicRoutes);
fastify.register(bearerRoutes);
fastify.setErrorHandler(error);

fastify.listen({ port: 3000, host: "127.0.0.1" }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
