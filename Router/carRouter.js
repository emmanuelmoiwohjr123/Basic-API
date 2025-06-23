import express from 'express';
import { createCar, getCars, getCar, updateCar, deleteCar } from '../controller/carController.js';

const router = express.Router();

// Car routes
router.post('/', createCar);
router.get('/', getCars);
router.get('/:id', getCar);
router.put('/:id', updateCar);
router.delete('/:id', deleteCar);

export default router;
