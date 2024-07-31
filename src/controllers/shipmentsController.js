import { create, deleteOne, getAll, getOne, update } from "../models/shipmentModel.js"

export const getAllCont = async (_, res) => {
    try {

        const shipments = await getAll();
        res.status(200).json({ message: 'Data succesfully fetched', data: shipments });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en get all shipments '});
    }
}

export const getOneCont = async (req, res) => {
    try {
        const { id } = req.params;
        const shipment = await getOne(parseInt(id));
        res.status(200).json({ data: shipment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en get one shipment'});
    }
}

export const createCont = async (req, res) => {
    try {
        const { item, quantity, warehouseId, vehicleId } = req.body;

        if (!item || !quantity ) {
            res.status(400).json({ message: 'Item and quantity are required' });
        }

        const newShipment = await create(item, quantity, warehouseId, vehicleId);
        res.status(201).json({ message: 'Shipment creado con éxito', data: newShipment });

    } catch (error) {
        console.log('error:  ', error);
        res.status(500).json({ message: 'Error en create shipment' });
    }
}

export const updateCont = async (req, res) => {
    try {
        const { id } = req.params;
        const { item, quantity, warehouseId, vehicleId } = req.body;

        if (!item || !quantity ) {
            res.status(400).json({ message: 'Item and quantity are required' });
        }

        const updatedShipment = await update(parseInt(id), item, quantity, warehouseId, vehicleId );
        res.status(201).json({  message: 'Shipment actualizada con éxito' ,data: updatedShipment });

    } catch (error) {

        console.log('error:  ', error);
        res.status(500).json({ message: 'Error en update Shipment' });
    }
}

export const deleteCont = async (req, res) => {
    try {
        const { id } = req.params;

        await deleteOne(parseInt(id));
        res.status(200).json({ message: 'shipment deleted succesfully' });

    } catch (error) {
        
        console.log('error:  ', error);
        res.status(500).json({ message: 'Error en delete shipment' });
    }
}