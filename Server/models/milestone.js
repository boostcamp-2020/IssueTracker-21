module.exports = (sequelize, Datatypes) => {
  return sequelize.define(
    "milestone",
    {
      id: {
        type: Datatypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        unique: true,
        primaryKey: true,
      },
      title: {
        type: Datatypes.STRING(255),
        allowNull: false,
      },
      description: {
        type: Datatypes.STRING(255),
        allowNull: true,
      },
      isOpened: {
        type: Datatypes.BOOLEAN, // 0: expenditure & 1: revenue
        allowNull: false,
        defaultValue: 1,
      },
      dueDate: {
        type: Datatypes.DATE,
        allowNull: false,
        defaultValue: Datatypes.NOW,
      },
    },
    {
      timestamps: true,
    }
  );
};
