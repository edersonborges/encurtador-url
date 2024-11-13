import prismaClient from '../../prisma';
import { hash } from 'bcryptjs';

interface UserRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  async execute({ name, email, password }: UserRequest) {
    const existingUserByEmail = await prismaClient.user.findUnique({ where: { email } });
    if (existingUserByEmail) {
        return 'O Email informado já está em uso por outro usuário.';
    }
    const hashedPassword = await hash(password, 8);

    const user = await prismaClient.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return user;
  }
}

export { CreateUserService };
