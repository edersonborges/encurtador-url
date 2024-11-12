import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { JWT_SECRET } from '../configs/config';
import { redisClient } from '../utils/redis';

interface Payload {
  sub: string;
}

// Mudamos o retorno da função para void, ao invés de Promise<void>
export async function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const authToken = req.headers.authorization;
  if (!authToken) {
    res.status(401).json({
      error: "Unauthorized",
      message: "Authentication is required to access this resource."
    }).end();
    return;
  }
  const [, token] = authToken.split(" ");

  if (!JWT_SECRET) {
    console.error('JWT_SECRET is not defined');
    res.status(500).json({ error: 'Internal server error' });
    return;
  }

  try {
    const isBlacklisted = await redisClient.get(`blacklist:${token}`);
    if (isBlacklisted) {
      res.status(401).json({ error: 'Token invalidated' }).end();
      return;
    }

    const { sub } = verify(token, JWT_SECRET) as Payload;
    req.user_id = sub;

    next();
  } catch (err) {
    res.status(401).end();
  }
}
