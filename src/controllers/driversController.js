import { create, getAll, getOne } from '../models/driverModel.js';

export const getAllCont = async (_, res) => {
    try {
        const drivers = await getAll();
        res.status(200).json({ message: 'Data succesfully fetched', data: drivers });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error in get all drivers ' });        
    }
}

export const getOneCont = async (req, res) => {
    try {
        const driver = await getOne(parseInt(req.params.id));
        res.status(200).json({ message: 'Data succesfully fetched', data: driver });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error in get one driver by id' });
    }
}

export const createCont = async (req, res) => {
    try {
        const { name, warehouseId } = req.body;
        const driver = await create(name, warehouseId);
        res.status(201).json({ message: 'Driver created succesfully', data: driver });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error in create driver' });
    }
}