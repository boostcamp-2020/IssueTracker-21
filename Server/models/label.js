module.exports = (sequelize, Datatypes) => {
  return sequelize.define(
    "label",
    {
      id: {
        type: Datatypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        unique: true,
        primaryKey: true,
      },
      name: {
        type: Datatypes.STRING(255),
        allowNull: false,
      },
      description: {
        type: Datatypes.STRING(255),
        allowNull: true,
      },
      color: {
        type: Datatypes.STRING(255),
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
