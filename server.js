import express from 'express';
import db from './models/index.js';
import carRouter from './Router/carRouter.js';
import customerRouter from './Router/customerRouter.js';
import rentalRouter from './Router/rentalRouter.js';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

// Routes
app.use('/api/cars', carRouter);
app.use('/api/customers', customerRouter);
app.use('/api/rentals', rentalRouter);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
