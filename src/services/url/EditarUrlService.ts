import prismaClient from '../../prisma';

interface EditarUrlRequest {
  userId: number;
  urlId: number;
  newOriginalUrl: string;
}

class EditarUrlService {
  async execute({ userId, urlId, newOriginalUrl }: EditarUrlRequest) {
    const url = await prismaClient.url.updateMany({
      where: {
        id: urlId,
        userId,
        deletedAt: null
      },
      data: {
        originalUrl: newOriginalUrl,
        updatedAt: new Date()
      },
    });

    if (url.count === 0) throw new Error("URL not found or not accessible");

    return { message: "URL updated successfully" };
  }
}

export { EditarUrlService };
