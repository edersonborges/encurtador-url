import { Router } from 'express';
import { createUserController, authUserController } from './controllers';

const initializeRoutes = (): Router => {
  const router = Router();

  router.post('/cadastrar', createUserController.handle.bind(createUserController));
  router.post('/login', authUserController.handle.bind(authUserController));

  return router;
};

export const router = initializeRoutes();
