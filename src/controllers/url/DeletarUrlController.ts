import { Request, Response } from 'express';
import { DeletarUrlService } from '../../services/url/DeletarUrlService';

class DeletarUrlController {
  private deletarUrlService: DeletarUrlService;

  constructor(deletarUrlService: DeletarUrlService) {
    this.deletarUrlService = deletarUrlService;
  }

  async handle(req: Request, res: Response) {
    const { urlId } = req.params;
    const userId = req.user_id;

    if (typeof userId !== 'number') {
      res.status(400).json({ error: 'User ID is required and must be a number' });
      return;
    }

    try {
      const result = await this.deletarUrlService.execute(userId, Number(urlId));
      res.status(200).json(result);
    } catch (error) {
      console.error('Error in DeletarUrlController:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export { DeletarUrlController };
