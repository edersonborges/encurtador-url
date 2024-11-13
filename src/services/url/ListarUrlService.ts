import prismaClient from '../../prisma';

class ListarUrlService {
  async execute(userId: number) {
    const urls = await prismaClient.url.findMany({
      where: {
        userId,
        deletedAt: null
      },
      select: {
        id: true,
        originalUrl: true,
        shortUrl: true,
        clickCount: true,
        updatedAt: true,
      },
    });
    return urls;
  }
}

export { ListarUrlService };
