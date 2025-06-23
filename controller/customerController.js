import db from '../models/index.js';

// Create a new customer
export const createCustomer = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, driverLicense } = req.body;
    const customer = await db.Customer.create({
      firstName,
      lastName,
      email,
      phone,
      driverLicense
    });
    res.status(201).json(customer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all customers
export const getCustomers = async (req, res) => {
  try {
    const customers = await db.Customer.findAll();
    res.json(customers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single customer by ID
export const getCustomer = async (req, res) => {
  try {
    const customer = await db.Customer.findByPk(req.params.id, {
      include: [{
        model: db.Rental,
        as: 'rentals',
        include: [{
          model: db.Car,
          as: 'car'
        }]
      }]
    });
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    res.json(customer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a customer
export const updateCustomer = async (req, res) => {
  try {
    const customer = await db.Customer.findByPk(req.params.id);
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    const updatedCustomer = await customer.update(req.body);
    res.json(updatedCustomer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a customer
export const deleteCustomer = async (req, res) => {
  try {
    const customer = await db.Customer.findByPk(req.params.id);
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    await customer.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
