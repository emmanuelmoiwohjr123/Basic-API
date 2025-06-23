export default (sequelize, DataTypes) => {
  const Customer = sequelize.define('Customer', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // driverLicense: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    //   unique: true
    // }
  });

  Customer.associate = (models) => {
    Customer.hasMany(models.Rental, {
      foreignKey: 'customerId',
      as: 'rentals'
    });
  };

  return Customer;
};