module.exports = (sequelize, DataTypes) => {
  const room = sequelize.define(
    "room",
    {
      idx: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      r_idx: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      user: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );
  return room;
};
