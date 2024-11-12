import { AuthUserController } from './user/AuthUserController';
import { AuthUserService } from '../services/user/AuthUserService';
const authUserService = new AuthUserService();
export const authUserController = new AuthUserController(authUserService);

import { CreateUserController } from './user/CreateUserController';
import { CreateUserService } from '../services/user/CreateUserService';
const createUserService = new CreateUserService();
export const createUserController = new CreateUserController(createUserService);

