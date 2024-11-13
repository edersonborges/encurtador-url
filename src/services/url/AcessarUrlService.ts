import prismaClient from '../../prisma';

class AcessarUrlService {
  async execute(shortUrl: string) {
    const urlData = await prismaClient.url.findUnique({
      where: { shortUrl },
    });

    if (!urlData || urlData.deletedAt) {
      throw new Error('URL não encontrada ou excluída.');
    }

    await prismaClient.url.update({
      where: { id: urlData.id },
      data: { clickCount: { increment: 1 } },
    });

    await prismaClient.click.create({
      data: {
        urlId: urlData.id,
      },
    });

    return urlData.originalUrl;
  }
}

export { AcessarUrlService };
