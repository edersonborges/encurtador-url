import prismaClient from '../../prisma';
import { randomBytes } from 'crypto';

interface EncurtarUrlRequest {
  originalUrl: string;
  userId?: number;
}

class EncurtarUrlService {
  async execute({ originalUrl, userId }: EncurtarUrlRequest) {
    const shortUrl = randomBytes(3).toString('base64').replace(/\//g, 'a').slice(0, 6);

    const urlData = await prismaClient.url.create({
      data: {
        originalUrl,
        shortUrl,
        userId,
        clickCount: 0,
        deletedAt: null,
        updatedAt: new Date()
      }
    });

    return urlData;
  }
}

export { EncurtarUrlService };
