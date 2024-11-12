import { Request, Response } from 'express';
import { AuthUserService } from '../../services/user/AuthUserService';

class AuthUserController {
  private authService: AuthUserService;

  constructor(authService: AuthUserService) {
    this.authService = authService;
  }

  async handle(req: Request, res: Response) {
    const { telefone, senha } = req.body;

    try {
      const result = await this.authService.execute({ telefone, senha });

      if (typeof result === 'string') {
        return res.status(400).json({ error: result });
      }

      return res.json({ success: true, data: result });

    } catch (error) {
      console.error('Error in AuthUserController:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export { AuthUserController };
