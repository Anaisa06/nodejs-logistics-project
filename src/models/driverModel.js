import {  promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);

const driverFilePath = path.join(_dirname, '../../db/drivers.json');

const writeFs = async (driver) => {
    await fs.writeFile(driverFilePath, JSON.stringify(driver, null, 2));
}

export const getAll = async () => {
    const drivers = await fs.readFile(driverFilePath);
    if(!drivers.length){
        return [];
    }
    return JSON.parse(drivers);
};

export const getOne = async (id) => {
    const drivers = await getAll();
    const driver = drivers.find((driver) => driver.id === id);

    if (!driver) {
        return { message: `Driver with id ${id} not found` }
    };
    return driver;
};

export const create = async (name, warehouseId) => {
    const drivers = await getAll();

    const newDriver = {
        id: drivers.length + 1,
        name,
        warehouseId
    };

    drivers.push(newDriver);
    await writeFs(drivers);
    return newDriver
};