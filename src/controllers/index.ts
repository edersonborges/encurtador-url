import { AuthUserController } from './user/AuthUserController';
import { AuthUserService } from '../services/user/AuthUserService';
const authUserService = new AuthUserService();
export const authUserController = new AuthUserController(authUserService);

import { CreateUserController } from './user/CreateUserController';
import { CreateUserService } from '../services/user/CreateUserService';
const createUserService = new CreateUserService();
export const createUserController = new CreateUserController(createUserService);

import { EncurtarUrlController } from './url/EncurtarUrlController';
import { EncurtarUrlService } from '../services/url/EncurtarUrlService';
const encurtarUrlService = new EncurtarUrlService();
export const encurtarUrlController = new EncurtarUrlController(encurtarUrlService);

import { LogoutController } from './user/LogoutController';  
import { LogoutService } from '../services/user/LogoutService';
const logoutService = new LogoutService();
export const logoutController = new LogoutController(logoutService);

import { ListarUrlController } from './url/ListarUrlController';
import { ListarUrlService } from '../services/url/ListarUrlService';
const listarUrlService = new ListarUrlService();
export const listarUrlController = new ListarUrlController(listarUrlService);

import { EditarUrlController } from './url/EditarUrlController';
import { EditarUrlService } from '../services/url/EditarUrlService';
const editarUrlService = new EditarUrlService();
export const editarUrlController = new EditarUrlController(editarUrlService);

import { DeletarUrlController } from './url/DeletarUrlController';
import { DeletarUrlService } from '../services/url/DeletarUrlService';
const deletarUrlService = new DeletarUrlService();
export const deletarUrlController = new DeletarUrlController(deletarUrlService);

import { AcessarUrlController } from './url/AcessarUrlController';
import { AcessarUrlService } from '../services/url/AcessarUrlService';
const acessarUrlService = new AcessarUrlService();
export const acessarUrlController = new AcessarUrlController(acessarUrlService);
