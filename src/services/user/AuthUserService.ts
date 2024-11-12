import prismaClient from '../../prisma';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { JWT_SECRET } from '../../configs/config';

interface AuthRequest {
  email: string;
  password: string;
}

class AuthUserService {
  async execute({ email, password }: AuthRequest) {
    const user = await prismaClient.user.findFirst({
      where: {
        email,
        deletedAt: null,
      },
    });

    if (!user || !(await compare(password, user.password))) {
      return 'Usuário ou senha incorretos. Tente novamente.';
    }

    const jwtSecret = JWT_SECRET;

    if (!jwtSecret) {
      return 'Chave secreta JWT não definida.';
    }

    const token = sign(
      {
        name: user.name,
        email: user.email,
      },
      jwtSecret,
      {
        subject: user.id.toString(),
        expiresIn: '1d',
      }
    );

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      token,
    };
  }
}

export { AuthUserService };
