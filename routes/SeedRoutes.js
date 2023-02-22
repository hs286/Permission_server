import express from 'express';
import { createSeedData, getSeedData } from '../controller/SeedController.js';

const route =express.Router();

route.get('/',getSeedData)
route.post('/',createSeedData)


export default route;