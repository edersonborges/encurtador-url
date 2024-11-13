import { Router } from 'express';
import { isAuthenticated } from './middlewares/isAuthenticated';
import { addUserIdToRequest } from './middlewares/addUserIdToRequest';

import { 
    createUserController,
    authUserController,
    encurtarUrlController,
    logoutController,
    listarUrlController,
    editarUrlController,
    deletarUrlController,
    acessarUrlController 
 } from './controllers';

const router = Router();

router.post('/user/cadastrar', createUserController.handle.bind(createUserController));
router.post('/user/login', authUserController.handle.bind(authUserController));
router.post('/user/logout', isAuthenticated, logoutController.handle.bind(logoutController));

router.post('/url/encurtar', addUserIdToRequest, encurtarUrlController.handle.bind(encurtarUrlController));
router.get('/url/listar', isAuthenticated, listarUrlController.handle.bind(listarUrlController));
router.put('/url/editar/:urlId', isAuthenticated, editarUrlController.handle.bind(editarUrlController));
router.delete('/url/deletar/:urlId', isAuthenticated, deletarUrlController.handle.bind(deletarUrlController));
router.get('/:shortUrl', acessarUrlController.handle.bind(acessarUrlController));


export { router };
