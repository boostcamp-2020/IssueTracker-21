module.exports = (sequelize, Datatypes) => {
  return sequelize.define(
    "user",
    {
      id: {
        type: Datatypes.STRING(64),
        allowNull: false,
        unique: true,
        primaryKey: true,
      },
      password: {
        type: Datatypes.STRING(64),
        allowNull: true,
      },
      salt: {
        type: Datatypes.STRING(64),
        allowNull: false,
      },
      profile: {
        type: Datatypes.STRING(64),
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
