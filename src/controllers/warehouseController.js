import { create, deleteOne, getAll, getOne, update } from "../models/warehouseModel.js";

export const getAllCont = async (_, res) => {
    try {
        const warehouses = await getAll();
        res.status(200).json({ data: warehouses });
    } catch (error) {
        console.log('error:  ', error);
        res.status(500).json({ message: 'Error en get warehouses' })
    }
}

export const getOneCont = async (req, res) => {
    try {
        const id = req.params.id;
        const warehouse = await getOne(parseInt(id));
        res.status(200).json({ data: warehouse });
    } catch (error) {
        console.log('error:  ', error);
        res.status(500).json({ message: 'Error en get warehouse by id' })
    }
}

export const createCont = async (req, res) => {
    try {
        const { name, location, vehicleId } = req.body;

        if (!name || !location) {
            res.status(400).json({ message: 'All fields are required' });
        }

        const newWarehouse = await create(name, location, vehicleId);
        res.status(201).json({ message: 'Warehouse creada con éxito', data: newWarehouse });

    } catch (error) {
        console.log('error:  ', error);
        res.status(500).json({ message: 'Error en create warehouse' });
    }
}

export const updateCont = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, location, vehicleId } = req.body;

        if (!name || !location) {
            res.status(400).json({ message: 'All fields are required' });
        }

        const updatedWarehouse = await update(parseInt(id), name, location, vehicleId);
        res.status(201).json({  message: 'Warehouse actualizada con éxito' ,data: updatedWarehouse });

    } catch (error) {

        console.log('error:  ', error);
        res.status(500).json({ message: 'Error en update warehouse' });
    }
}

export const deleteCont = async (req, res) => {
    try {
        const { id } = req.params;

        await deleteOne(parseInt(id));
        res.status(200).json({ message: 'Warehouse deleted succesfully' });

    } catch (error) {
        
        console.log('error:  ', error);
        res.status(500).json({ message: 'Error en delete warehouse' });
    }
}