import { Request, Response } from 'express';
import { AuthUserService } from '../../services/user/AuthUserService';

class AuthUserController {
  private authUserService: AuthUserService;

  constructor(authUserService: AuthUserService) {
    this.authUserService = authUserService;
  }

  async handle(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;

    try {
      const authResult = await this.authUserService.execute({ email, password });

      if (typeof authResult === 'string') {
        res.status(400).json({ error: authResult });
      } else {
        res.status(200).json(authResult);
      }
    } catch (error) {
      console.error('Error in AuthUserController:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export { AuthUserController };
