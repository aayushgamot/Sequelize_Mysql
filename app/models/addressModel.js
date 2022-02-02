module.exports = (sequelize, Sequelize) => {
  const Address = sequelize.define(
    "addressData",
    {
      title: {
        type: Sequelize.STRING,
      },
      address1: {
        type: Sequelize.STRING,
      },
      address2: {
        type: Sequelize.STRING,
      },
      country: {
        type: Sequelize.ENUM(["india", "maldives", "congo", "germany"]),
      },
      state: {
        type: Sequelize.ENUM(["gujarat", "goa", "punjab", "rajasthan"]),
      },
      city: {
        type: Sequelize.ENUM(["navsari", "ahmedabad", "surat", "gandhinagar"]),
      },
      pincode: {
        type: Sequelize.STRING,
      },
    },
    {
      timestamps: false,
    }
  );
  return Address;
};
