import express from 'express';
import { createRental, getRentals, getRental, updateRental, deleteRental } from '../controller/rentalController.js';

const router = express.Router();

// Rental routes
router.post('/', createRental);
router.get('/', getRentals);
router.get('/:id', getRental);
router.put('/:id', updateRental);
router.delete('/:id', deleteRental);

export default router;
