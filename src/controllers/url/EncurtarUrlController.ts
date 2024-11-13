import { Request, Response } from 'express';
import { EncurtarUrlService } from '../../services/url/EncurtarUrlService';

class EncurtarUrlController {
  private encurtarUrlService: EncurtarUrlService;

  constructor(encurtarUrlService: EncurtarUrlService) {
    this.encurtarUrlService = encurtarUrlService;
  }

  async handle(req: Request, res: Response) {
    const { originalUrl } = req.body;
    const userId = req.user_id ? parseInt(req.user_id, 10) : undefined;

    try {
      const urlData = await this.encurtarUrlService.execute({ originalUrl, userId });
      res.status(201).json({ success: true, data: urlData });
    } catch (error) {
      console.error('Erro ao encurtar a URL:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
}

export { EncurtarUrlController };
