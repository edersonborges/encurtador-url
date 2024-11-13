import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import cors from "cors";
import { PORT } from "./configs/config";
import { router } from "./routes";
import swaggerUi from 'swagger-ui-express';
import swaggerFile from '../swagger_output.json';

const app = express();
const port = PORT || 5003;


app.use(express.json());
app.use(cors());

// Middleware para logar as requisições
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  res.on("finish", () => {
    console.log(
      `[${new Date().toISOString()}] ${req.method} ${req.url} - Status: ${res.statusCode}`
    );
  });
  next();
});

// Rota inicial para verificação do servidor
app.get("/", (req: Request, res: Response) => {
  res.send("Server is running");
});

// Rotas da aplicação
app.use(router);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

// Middleware de tratamento de erros
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Error) {
    console.error(`[${new Date().toISOString()}] Error: ${err.message}`);
    res.status(400).json({ error: err.message });
  } else {
    console.error(`[${new Date().toISOString()}] Internal Server Error`);
    res.status(500).json({
      status: "error",
      message: "Internal server error.",
    });
  }
});

// Inicializa o servidor
app.listen(port, () => {
  console.log(`Servidor Online na porta: ${port}!!`);
});
