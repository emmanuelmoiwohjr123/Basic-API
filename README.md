We are completing the Basic Api today, please push your work infront small before coming to class so that you can't be left behind. you project should be connected to a database, and if you have any other tables created pls delete them, you should have the Router, Controller, Models all set up.
This is what we will cover today: # basic_api
Project Description
Build a simple API that allows you to manage a car rental system. You will perform CRUD operations on:

-- Cars — Add, update, delete, and list cars available for rent.

-- Customers — Register and manage customers.

-- Rentals — Create and track which customer rented which car, and for how long.

# Models

1. Customer
id: integer (auto-increment, primary key)
name: string
email: string
phone: string

2. Car 
id: integer (auto-increment, primary key)
make: string
model: string
year: integer
rentalPricePerDay: decimal
isAvailable: boolean (default: true)


3. Rental
id: integer (auto-increment, primary key)
carId: foreign key → Car
customerId: foreign key → Customer
startDate: date
endDate: date
totalCost: decimal (auto-calculated: days * rentalPricePerDay)

# RESTful API Endpoints

## Car Endpoints

| Method | Endpoint    | Description            | Request Body                                      | Response                        |
| ------ | ----------- | ---------------------- | ------------------------------------------------- | ------------------------------- |
| POST   | `/api/cars` | Add new car           | `{"make": string, "model": string, "year": number, "licensePlate": string, "dailyRate": number}` | Created car object              |
| GET    | `/api/cars` | List all cars         | -                                                 | Array of car objects            |
| GET    | `/api/cars/:id` | Get car details     | -                                                 | Car object                      |
| PUT    | `/api/cars/:id` | Update car          | `{"make"?: string, "model"?: string, "year"?: number, "licensePlate"?: string, "dailyRate"?: number}` | Updated car object              |
| DELETE | `/api/cars/:id` | Delete car          | -                                                 | No content                      |

## Customer Endpoints


# Rental Endpoints

| Method | Endpoint       | Description                |
| ------ | -------------- | -------------------------- |
| POST   | `/rentals`     | Rent a car                 |
| GET    | `/rentals`     | View all rentals           |
| GET    | `/rentals/:id` | View a specific rental     |
| DELETE | `/rentals/:id` | Cancel a rental (optional) |


# Logic Notes
When renting a car, check if isAvailable is true.

On successful rental, update isAvailable to false.

On delete rental (if you allow), set isAvailable back to true.

Total cost = number of days × rentalPricePerDay.