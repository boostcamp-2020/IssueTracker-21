module.exports = (sequelize, Datatypes) => {
  return sequelize.define(
    "image",
    {
      id: {
        type: Datatypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        unique: true,
        primaryKey: true,
      },
      imageData: {
        type: Datatypes.STRING(1024),
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
