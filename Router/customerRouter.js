import express from 'express';
import { createCustomer, getCustomers, getCustomer, updateCustomer, deleteCustomer } from '../controller/customerController.js';

const router = express.Router();

// Customer routes
router.post('/', createCustomer);
router.get('/', getCustomers);
router.get('/:id', getCustomer);
router.put('/:id', updateCustomer);
router.delete('/:id', deleteCustomer);

export default router;
