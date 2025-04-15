import Fastify from "fastify";
import routes from "./routes";
import error from "./middleware/error";
import { login } from "./middleware/auth";

const fastify = Fastify({ logger: true });

fastify.register(login);
fastify.register(routes);
fastify.setErrorHandler(error);

fastify.listen({ port: 3000 }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
