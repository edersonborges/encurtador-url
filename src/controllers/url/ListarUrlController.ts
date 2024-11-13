import { Request, Response } from 'express';
import { ListarUrlService } from '../../services/url/ListarUrlService';

class ListarUrlController {
  private listarUrlService: ListarUrlService;

  constructor(listarUrlService: ListarUrlService) {
    this.listarUrlService = listarUrlService;
  }

  async handle(req: Request, res: Response) {
    const userId = req.user_id ? Number(req.user_id) : undefined;

    if (userId === undefined || isNaN(userId)) {
      res.status(400).json({ error: 'User ID is required and must be a valid number' });
      return;
    }

    try {
      const urls = await this.listarUrlService.execute(userId);
      res.status(200).json({ success: true, data: urls });
    } catch (error) {
      console.error('Error in ListarUrlController:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export { ListarUrlController };
