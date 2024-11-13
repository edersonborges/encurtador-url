import prismaClient from '../../prisma';

class DeletarUrlService {
  async execute(userId: number, urlId: number) {
    const url = await prismaClient.url.updateMany({
      where: {
        id: urlId,
        userId,
        deletedAt: null
      },
      data: {
        deletedAt: new Date(),
      },
    });

    if (url.count === 0) throw new Error("URL not found or not accessible");

    return { message: "URL deleted successfully (soft delete)" };
  }
}

export { DeletarUrlService };
