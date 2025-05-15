import { FastifyRequest, FastifyReply } from "fastify";
import { MainService } from "@src/services/MainService";
import { randomId } from "@src/utilities/idGenerator";

function isEmptyPayload(body: any) {
  return !body || Object.keys(body).length === 0;
}

function emptyPayloadResolver(reply: FastifyReply) {
  return reply.code(400).send({ mensaje: "Debe especificar un payload" });
}

function keysNotSupportedResolver(reply: FastifyReply, keys: string[]) {
  return reply.code(400).send({
    mensaje: `Los siguientes campos no son aceptados para este recurso: ${keys.join(",")}`,
  });
}

export interface MainControllerProps {
  service: MainService;
  resourceName: string;
}

export class MainController {
  constructor(protected props: MainControllerProps) {}

  async getAll(request: FastifyRequest, reply: FastifyReply) {
    return this.props.service.findAll(request.query);
  }

  async getById(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };
    const product = this.props.service.findBy(id);

    if (!product) return this.notFoundResolver(reply, id);

    return product;
  }

  async create(request: FastifyRequest, reply: FastifyReply) {
    if (this.validateBody(request, reply)) return;

    return reply.code(201).send({
      ...(request.body as any),
      id: randomId(),
    });
  }

  async update(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };
    const product = this.props.service.findBy(id);

    if (!product) return this.notFoundResolver(reply, id);

    if (this.validateBody(request, reply)) return;

    return {
      ...(request.body as any),
      id: product.id,
    };
  }

  async patch(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };
    const product = this.props.service.findBy(id);

    if (!product) return this.notFoundResolver(reply, id);

    if (this.validateBody(request, reply)) return;

    return {
      ...product,
      ...(request.body as any),
    };
  }

  async deleteById(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };
    const product = this.props.service.findBy(id);

    if (!product) return this.notFoundResolver(reply, id);

    return {
      mensaje: `${this.props.resourceName} con id ${id} se ha eliminado satisfactoriamente`,
    };
  }

  private notFoundResolver(reply: FastifyReply, id: string) {
    return reply.status(404).send({
      mensaje: `${this.props.resourceName} con id ${id} no encontrado`,
    });
  }

  private validateBody(request: FastifyRequest, reply: FastifyReply) {
    if (isEmptyPayload(request.body)) {
      return emptyPayloadResolver(reply);
    }

    const keysNotSupported = this.props.service.getKeysNotSupportedIn(
      request.body,
    );
    if (keysNotSupported.length > 0) {
      return keysNotSupportedResolver(reply, keysNotSupported);
    }
  }
}
