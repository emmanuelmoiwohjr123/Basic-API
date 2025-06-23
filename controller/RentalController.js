import db from '../models/index.js';

// Create a new rental
export const createRental = async (req, res) => {
  try {
    const { carId, customerId, startDate, endDate } = req.body;

    // Check if car exists and is available
    const car = await db.Car.findByPk(carId);
    if (!car) {
      return res.status(404).json({ error: 'Car not found' });
    }
    if (!car.available) {
      return res.status(400).json({ error: 'Car is not available for rent' });
    }

    // Check if customer exists
    const customer = await db.Customer.findByPk(customerId);
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    // Calculate total cost
    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    const totalCost = days * car.dailyRate;

    // Create rental and update car availability
    const rental = await db.Rental.create({
      carId,
      customerId,
      startDate,
      endDate,
      totalCost,
      status: 'active'
    });

    await car.update({ available: false });

    res.status(201).json(rental);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all rentals
export const getRentals = async (req, res) => {
  try {
    const rentals = await db.Rental.findAll({
      include: [
        {
          model: db.Car,
          as: 'car'
        },
        {
          model: db.Customer,
          as: 'customer'
        }
      ]
    });
    res.json(rentals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single rental by ID
export const getRental = async (req, res) => {
  try {
    const rental = await db.Rental.findByPk(req.params.id, {
      include: [
        {
          model: db.Car,
          as: 'car'
        },
        {
          model: db.Customer,
          as: 'customer'
        }
      ]
    });
    if (!rental) {
      return res.status(404).json({ error: 'Rental not found' });
    }
    res.json(rental);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a rental
export const updateRental = async (req, res) => {
  try {
    const rental = await db.Rental.findByPk(req.params.id);
    if (!rental) {
      return res.status(404).json({ error: 'Rental not found' });
    }

    // If status is being updated to 'completed', make the car available again
    if (req.body.status === 'completed' && rental.status === 'active') {
      const car = await db.Car.findByPk(rental.carId);
      if (car) {
        await car.update({ available: true });
      }
    }

    const updatedRental = await rental.update(req.body);
    res.json(updatedRental);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a rental
export const deleteRental = async (req, res) => {
  try {
    const rental = await db.Rental.findByPk(req.params.id);
    if (!rental) {
      return res.status(404).json({ error: 'Rental not found' });
    }

    // If rental is active, make the car available again before deleting
    if (rental.status === 'active') {
      const car = await db.Car.findByPk(rental.carId);
      if (car) {
        await car.update({ available: true });
      }
    }

    await rental.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};