export default (sequelize, DataTypes) => {
  const Car = sequelize.define('Car', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    make: {
      type: DataTypes.STRING,
      allowNull: false
    },
    model: {
      type: DataTypes.STRING,
      allowNull: false
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    licensePlate: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    // available: {
    //   type: DataTypes.BOOLEAN,
    //   defaultValue: true
    // },
    dailyRate: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    }
  });

  Car.associate = (models) => {
    Car.hasMany(models.Rental, {
      foreignKey: 'carId',
      as: 'rentals'
    });
  };

  return Car;
};