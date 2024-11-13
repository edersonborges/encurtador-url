import { verify } from 'jsonwebtoken';
import { JWT_SECRET } from '../../configs/config';
import { redisClient } from '../../utils/redis';

class LogoutService {
  private static TOKEN_EXPIRATION_TIME = 60 * 60 * 24; // 24 horas em segundos

  public async execute(token: string): Promise<string> {
    if (!JWT_SECRET) {
      throw new Error('JWT_SECRET não definido');
    }

    try {
      const decodedToken: any = this.decodeToken(token);
      if (decodedToken) {
        const tokenExpiryTime = decodedToken.exp - Math.floor(Date.now() / 1000);
        await redisClient.setEx(
          `blacklist:${token}`,
          tokenExpiryTime > 0 ? tokenExpiryTime : LogoutService.TOKEN_EXPIRATION_TIME,
          token
        );
        return "Logout realizado com sucesso";
      }
      return "Token inválido";
    } catch (error) {
      console.error('Error in LogoutService:', error);
      return 'Falha ao realizar logout';
    }
  }

  private decodeToken(token: string): any {
    try {
      const decoded = verify(token, JWT_SECRET as string);
      return decoded;
    } catch (err) {
      console.error('Error decoding token:', err);
      return null;
    }
  }
}

export { LogoutService };
