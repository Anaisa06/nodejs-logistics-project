import {  promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);

const vehicleFilePath = path.join(_dirname, '../../db/vehicles.json');

const writeFs = async (vehicle) => {
    await fs.writeFile(vehicleFilePath, JSON.stringify(vehicle, null, 2));
}

export const getAll = async () => {
    const vehicles = await fs.readFile(vehicleFilePath);
    if(!vehicles.length){
        return [];
    }
    return JSON.parse(vehicles);
};

export const getOne = async (id) => {
    const vehicles = await getAll();
    const vehicle = vehicles.find((v) => v.id === id);

    if (!vehicle) {
        return { message: `Vehicle with id ${id} not found` }
    };
    return vehicle;
};

export const create = async (model, year, driverId) => {
    const vehicles = await getAll();

    const newVehicle = {
        id: vehicles.length + 1,
        model,
        year,
        driverId
    };

    vehicles.push(newVehicle);
    await writeFs(vehicles);
    return newVehicle
};