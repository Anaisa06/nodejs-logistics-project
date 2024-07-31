import express from "express";
import { warehouseRouter } from "./warehouseRouter.js";
import { shipmentRouter } from "./shipmentRouter.js";

export const routes = express();

routes.use('/warehouses', warehouseRouter);
// routes.use('/drivers', driverRouter);
routes.use('/shipments', shipmentRouter);
// routes.use('/vehicles', vehicleRouter);
