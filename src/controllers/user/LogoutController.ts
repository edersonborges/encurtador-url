import { Request, Response } from 'express';
import { LogoutService } from '../../services/user/LogoutService';

class LogoutController {
  private logoutService: LogoutService;

  constructor(logoutService: LogoutService) {
    this.logoutService = logoutService;
  }

  async handle(req: Request, res: Response) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      (() => res.status(400).json({ error: 'Token não fornecido' }))();
      return;
    }

    const token = authHeader.split(' ')[1];

    try {
      const result = await this.logoutService.execute(token);
      res.status(200).json({ message: result });
    } catch (error) {
      console.error('Erro no LogoutController:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
}

export { LogoutController };
