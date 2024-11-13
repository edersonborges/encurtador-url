import prismaClient from '../../prisma';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { JWT_SECRET } from '../../configs/config';

interface AuthRequest {
  email: string;
  password: string;
}

interface AuthResponse {
  id: number;
  name: string;
  email: string;
  token: string;
}

class AuthUserService {
  async execute({ email, password }: AuthRequest): Promise<AuthResponse | string> {
    const user = await prismaClient.user.findFirst({
      where: {
        email,
        deletedAt: null,
      },
    });

    // Verifica se o usuário não existe ou se a senha está incorreta
    if (!user || !(await compare(password, user.password))) {
      return 'Usuário ou senha incorretos. Tente novamente.';
    }

    const jwtSecret = JWT_SECRET;

    // Verifica se a chave secreta do JWT está configurada
    if (!jwtSecret) {
      return 'Chave secreta JWT não definida.';
    }

    // Cria o token JWT
    const token = sign(
      {
        name: user.name,
        email: user.email,
      },
      jwtSecret,
      {
        subject: user.id.toString(),
        expiresIn: '1d', // Expira após 1 dia
      }
    );

    // Retorna as informações do usuário e o token gerado
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      token,
    };
  }
}

export { AuthUserService };
