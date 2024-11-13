import { Request, Response } from 'express';
import { AcessarUrlService } from '../../services/url/AcessarUrlService';

class AcessarUrlController {
  private acessarUrlService: AcessarUrlService;

  constructor(acessarUrlService: AcessarUrlService) {
    this.acessarUrlService = acessarUrlService;
  }

  async handle(req: Request, res: Response) {
    const { shortUrl } = req.params;

    try {
      const originalUrl = await this.acessarUrlService.execute(shortUrl);

      if (originalUrl) {
        res.redirect(originalUrl);  // Redirect to the original URL
      } else {
        res.status(404).json({ error: 'URL not found' });
      }
    } catch (error) {
      console.error('Error in AcessarUrlController:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export { AcessarUrlController };
