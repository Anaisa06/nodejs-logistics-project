import { Router } from 'express';
import { createCont, getAllCont, getOneCont } from '../controllers/driversController.js';

export const driverRouter = Router();

driverRouter.get('/', getAllCont);
driverRouter.get('/:id', getOneCont);
driverRouter.post('/', createCont);