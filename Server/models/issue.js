module.exports = (sequelize, Datatypes) => {
  return sequelize.define(
    "issue",
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
      },
<<<<<<< HEAD
=======
      lastStatusChanger: {
        type: Datatypes.STRING(255),
        allowNull: true,
      },
>>>>>>> df880aa4b82f1252b2b8bf2eabc13308cf338f78
    },
    {
      timestamps: true,
    }
  );
};
