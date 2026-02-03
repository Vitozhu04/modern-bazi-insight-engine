import Fastify from "fastify";
import cors from "@fastify/cors";

import { registerErrorHandler } from "./middleware/errorHandler.js";

export const buildServer = () => {
  const app = Fastify({
    logger: false,
  });

  app.register(cors, {
    origin: true,
  });

  registerErrorHandler(app);

  return app;
};
