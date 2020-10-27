module.exports = (sequelize, Datatypes) => {
  return sequelize.define(
    "comment",
    {
      id: {
        type: Datatypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        unique: true,
        primaryKey: true,
      },
      content: {
        type: Datatypes.STRING(255),
        allowNull: true,
      },
      createDate: {
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
