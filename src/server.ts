import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "../swagger_output.json";
import { PORT } from "./configs/config";
import { router } from "./routes";

const app = express();
const port = PORT || 5003;

app.use(express.json());
app.use(cors());

// Middleware para log de requisições
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  res.on("finish", () => {
    console.log(
      `[${new Date().toISOString()}] ${req.method} ${req.url} - Status: ${res.statusCode}`
    );
  });
  next();
});

// Rota de documentação da API com Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

// Adicionando o router principal para as rotas
app.use(router);

// Middleware de tratamento de erros
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Error) {
    console.error(`[${new Date().toISOString()}] Error: ${err.message}`);
    return res.status(400).json({ error: err.message });
  }

  console.error(`[${new Date().toISOString()}] Internal Server Error`);
  return res.status(500).json({ status: "error", message: "Internal server error." });
});

// Inicializa o servidor
app.listen(port, () => {
  console.log(`Servidor Online na porta: ${port}!!`);
});
