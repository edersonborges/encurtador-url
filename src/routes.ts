import { Router } from 'express';
import { isAuthenticated } from './middlewares/isAuthenticated';
import {
    createUserController,
    authUserController,
} from './controllers';

const router = Router();

router.post('/admin/cadastrar', createUserController.handle.bind(createUserController));
router.post('/login', authUserController.handle.bind(authUserController));

export { router };
