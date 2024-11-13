import { Request, Response } from 'express';
import { CreateUserService } from '../../services/user/CreateUserService';

class CreateUserController {
  private createUserService: CreateUserService;

  constructor(createUserService: CreateUserService) {
    this.createUserService = createUserService;
  }

  /**
   * @swagger
   * /cadastrar:
   *   post:
   *     summary: Cadastra um novo usuário
   *     tags: [User]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               name:
   *                 type: string
   *               email:
   *                 type: string
   *               password:
   *                 type: string
   *     responses:
   *       201:
   *         description: Usuário criado com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                 data:
   *                   $ref: '#/components/schemas/User'
   *       500:
   *         description: Erro interno do servidor
   */
  async handle(req: Request, res: Response): Promise<void> {
    const { name, email, password } = req.body;

    try {
      const user = await this.createUserService.execute({ name, email, password });
      res.status(201).json({ success: true, data: user });
    } catch (error) {
      console.error('Error in CreateUserController:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export { CreateUserController };
