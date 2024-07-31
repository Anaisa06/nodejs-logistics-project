import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);

const shipmentFilePath = path.join(_dirname, '../../db/shipments.json');

const writeFs = async (shipments) => {
    await fs.writeFile(shipmentFilePath, JSON.stringify(shipments, null, 2));
}

export const getAll = async () => {
    const shipments = await fs.readFile(shipmentFilePath);
    if (!shipments.length) {
        return [];
        }
    return JSON.parse(shipments);
};

export const getOne = async (id) => {

    const shipments = await getAll();
    const shipment = shipments.find((s) => s.id === id);
    console.log(shipments[0].id);

    if(!shipment) {
        return { message: ` shipment with id ${id} not found` };
    }

    return shipment;
};

export const create = async (item, quantity, warehouseId, vehicleId) => {
    const shipments = await getAll();
   
    const newShipment = {
        id: shipments.length +1,
        item,
        quantity,
        warehouseId,
        vehicleId
    };

    shipments.push(newShipment);
    await writeFs(shipments);
    return newShipment;
};

export const update = async (id, item, quantity, warehouseId, vehicleId) => {
    const shipments = await getAll();
    const index = shipments.findIndex((w) => w.id === id);
    
    if (index == -1){
        return { message: ` warehouse with id ${id} not found` };
    };

    const updatedShipment = {
        id,
        item,
        quantity,
        warehouseId,
        vehicleId
    };

    shipments[index] = updatedShipment;
    await writeFs(shipments);
    return updatedShipment;
};

export const deleteOne = async (id) => {
    const shipments = await getAll();
    const index = shipments.findIndex((s) => s.id === id);

    if (index == -1){
        return { message: ` shipment with id ${id} not found` };
    };

    shipments.splice(index, 1);
    await writeFs(shipments);
};