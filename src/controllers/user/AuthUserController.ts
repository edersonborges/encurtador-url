import { Request, Response } from 'express';
import { AuthUserService } from '../../services/user/AuthUserService';

class AuthUserController {
  private authUserService: AuthUserService;

  constructor(authUserService: AuthUserService) {
    this.authUserService = authUserService;
  }

  /**
   * @swagger
   * /login:
   *   post:
   *     summary: Autentica um usuário
   *     tags: [Auth]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               email:
   *                 type: string
   *               password:
   *                 type: string
   *     responses:
   *       200:
   *         description: Autenticação bem-sucedida
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 id:
   *                   type: integer
   *                 name:
   *                   type: string
   *                 email:
   *                   type: string
   *                 token:
   *                   type: string
   *       400:
   *         description: Credenciais inválidas
   *       500:
   *         description: Erro interno do servidor
   */
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
