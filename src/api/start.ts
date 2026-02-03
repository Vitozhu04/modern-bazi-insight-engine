import { buildServer } from "./server.js";
import { registerAnalyzeRoutes } from "./routes/analyze.js";
import { registerInterpretRoutes } from "./routes/interpret.js";

const app = buildServer();

registerAnalyzeRoutes(app);
registerInterpretRoutes(app);

const port = Number(process.env.PORT ?? 4100);
const host = process.env.HOST ?? "127.0.0.1";

app
  .listen({ port, host })
  .then(() => {
    app.log.info(`API server listening on http://${host}:${port}`);
  })
  .catch((error) => {
    app.log.error(error);
    process.exit(1);
  });
