import { create, getAll, getOne } from '../models/vehicleModel.js';

export const getAllCont = async (_, res) => {
    try {
        const vehicles = await getAll();
        res.status(200).json({ message: 'Data succesfully fetched', data: vehicles });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error in get all vehicles ' });        
    }
}

export const getOneCont = async (req, res) => {
    try {
        const vehicle = await getOne(parseInt(req.params.id));
        res.status(200).json({ message: 'Data succesfully fetched', data: vehicle });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error in get one vehicle by id' });
    }
}

export const createCont = async (req, res) => {
    try {
        const { model, year, driverId } = req.body;
        const vehicle = await create(model, year, driverId);
        res.status(201).json({ message: 'Vehicle created succesfully', data: vehicle });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error in create vehicle' });
    }
}