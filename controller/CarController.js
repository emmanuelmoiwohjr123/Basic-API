import db from '../models/index.js';

// Create a new car
export const createCar = async (req, res) => {
  try {
    const { make, model, year, licensePlate, dailyRate } = req.body;
    const car = await db.Car.create({
      make,
      model,
      year,
      licensePlate,
      dailyRate
    });
    res.status(201).json(car);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all cars
export const getCars = async (req, res) => {
  try {
    const cars = await db.Car.findAll();
    res.json(cars);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single car by ID
export const getCar = async (req, res) => {
  try {
    const car = await db.Car.findByPk(req.params.id);
    if (!car) {
      return res.status(404).json({ error: 'Car not found' });
    }
    res.json(car);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a car
export const updateCar = async (req, res) => {
  try {
    const car = await db.Car.findByPk(req.params.id);
    if (!car) {
      return res.status(404).json({ error: 'Car not found' });
    }
    const updatedCar = await car.update(req.body);
    res.json(updatedCar);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a car
export const deleteCar = async (req, res) => {
  try {
    const car = await db.Car.findByPk(req.params.id);
    if (!car) {
      return res.status(404).json({ error: 'Car not found' });
    }
    await car.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
