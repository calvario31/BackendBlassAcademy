import { FastifyRequest, FastifyReply } from "fastify";
import { MainService } from "@src/services/MainService";
import { randomId } from "@src/utilities/idGenerator";

function isEmptyPayload(body: any) {
  return !body || Object.keys(body).length === 0;
}

function emptyPayloadResolver(reply: FastifyReply) {
  return reply.code(400).send({ message: "Debe especificar un payload" });
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
    if (isEmptyPayload(request.body)) {
      return emptyPayloadResolver(reply);
    }

    return reply.code(201).send({
      ...(request.body as any),
      id: randomId(),
    });
  }

  async update(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };
    const product = this.props.service.findBy(id);

    if (!product) return this.notFoundResolver(reply, id);

    if (isEmptyPayload(request.body)) {
      return emptyPayloadResolver(reply);
    }

    return {
      ...(request.body as any),
      id,
    };
  }

  async patch(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };
    const product = this.props.service.findBy(id);

    if (!product) return this.notFoundResolver(reply, id);

    if (isEmptyPayload(request.body)) {
      return emptyPayloadResolver(reply);
    }

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
      message: `${this.props.resourceName} con id ${id} se ha eliminado satisfactoriamente`,
    };
  }

  private notFoundResolver(reply: FastifyReply, id: string) {
    return reply
      .status(404)
      .send({ message: `${this.props.resourceName} con id ${id} no encontrado` });
  }
}
