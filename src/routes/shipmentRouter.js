import { Router } from 'express';
import { createCont, deleteCont, getAllCont, getOneCont, updateCont } from '../controllers/shipmentsController.js';

export const shipmentRouter =  Router();

shipmentRouter.get('/', getAllCont);
shipmentRouter.get('/:id', getOneCont);
shipmentRouter.post('/', createCont);
shipmentRouter.put('/:id', updateCont);
shipmentRouter.delete('/:id', deleteCont);