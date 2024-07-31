import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);

const warehouseFilePath = path.join(_dirname, '../../db/warehouses.json');

const writeFs = async (warehouses) => {
    await fs.writeFile(warehouseFilePath, JSON.stringify(warehouses, null, 2));
}

export const getAll = async () => {
    const warehouses = await fs.readFile(warehouseFilePath);
    if (!warehouses.length) {
        return [];
        }
    return JSON.parse(warehouses);
};

export const getOne = async (id) => {

    const warehouses = await getAll();
    const warehouse = warehouses.find((w) => w.id === id);

    if(!warehouse) {
        return { message: ` warehouse with id ${id} not found` };
    }

    return warehouse;
};

export const create = async (name, location, vehicleId) => {
    const warehouses = await getAll();
   
    const newWarehouse = {
        id: warehouses.length +1,
        name,
        location,
        vehicleId
    };

    warehouses.push(newWarehouse);
    await writeFs(warehouses);
    return newWarehouse;
};

export const update = async (id, name, location, vehicleId) => {
    const warehouses = await getAll();
    const index = warehouses.findIndex((w) => w.id === id);
    
    if (index == -1){
        return { message: ` warehouse with id ${id} not found` };
    };

    const updatedWarehouse = {
        id,
        name,
        location,
        vehicleId
    };

    warehouses[index] = updatedWarehouse;
    await writeFs(warehouses);
    return updatedWarehouse;
};

export const deleteOne = async (id) => {
    const warehouses = await getAll();
    const index = warehouses.findIndex((w) => w.id === id);

    if (index == -1){
        return { message: ` warehouse with id ${id} not found` };
    };

    warehouses.splice(index, 1);
    await writeFs(warehouses);
}