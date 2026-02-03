import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

export const registerErrorHandler = (app: FastifyInstance) => {
  app.setErrorHandler((error: Error, _request: FastifyRequest, reply: FastifyReply) => {
    reply.status(500).send({
      error: "InternalError",
      message: error.message,
    });
  });
};
