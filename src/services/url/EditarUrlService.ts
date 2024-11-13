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

    if (url.count === 0) throw new Error("URL nao encontrada ou nao pertence a voce");

    return { message: "URL updated successfully" };
  }
}

export { EditarUrlService };
