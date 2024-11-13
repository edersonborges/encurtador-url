import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { JWT_SECRET } from '../configs/config';

interface Payload {
  sub: string;
}

export async function addUserIdToRequest(req: Request, res: Response, next: NextFunction): Promise<void> {
  const authToken = req.headers.authorization;
  
  if (!authToken) {
    return next();
  }

  const [, token] = authToken.split(" ");
  
  if (!JWT_SECRET) {
    console.error('JWT_SECRET não está definido!');
    res.status(500).json({ error: 'Erro interno do servidor, chave secreta não definida.' });
    return;
  }

  try {
    const { sub } = verify(token, JWT_SECRET) as Payload;
    req.user_id = sub;
  } catch (err) {
    console.error('Erro ao verificar o token:', err);
  }

  next();
}
