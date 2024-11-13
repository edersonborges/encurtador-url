import { Request, Response } from 'express';
import { EditarUrlService } from '../../services/url/EditarUrlService';

class EditarUrlController {
  private editarUrlService: EditarUrlService;

  constructor(editarUrlService: EditarUrlService) {
    this.editarUrlService = editarUrlService;
  }

  async handle(req: Request, res: Response) {
    const { urlId } = req.params;
    
    const { newOriginalUrl } = req.body;
    const userId = req.user_id ? Number(req.user_id) : undefined;

    if (userId === undefined || isNaN(userId)) {
      res.status(400).json({ error: 'User ID is required and must be a valid number' });
      return;
    }
    try {
      const result = await this.editarUrlService.execute({
        userId,
        urlId: Number(urlId),
        newOriginalUrl,
      });
      res.status(200).json(result);
    } catch (error) {
      console.error('Error in EditarUrlController:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export { EditarUrlController };
