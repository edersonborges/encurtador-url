import { Request, Response } from 'express';
import { CreateUserService } from '../../services/user/CreateUserService';

class CreateUserController {
  private createUserService: CreateUserService;

  constructor(createUserService: CreateUserService) {
    this.createUserService = createUserService;
  }

  async handle(req: Request, res: Response) {
    const { name, email, password } = req.body;

    try {
      const user = await this.createUserService.execute({ name, email, password });
      return res.status(201).json({ success: true, data: user });

    } catch (error) {
      console.error('Error in CreateUserController:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export { CreateUserController };
