import { Router } from 'express';
import { createCont, getAllCont, getOneCont } from '../controllers/warehouseController.js';

export const warehouseRouter =  Router();

warehouseRouter.get('/', getAllCont);
warehouseRouter.get('/:id', getOneCont);
warehouseRouter.post('/', createCont);