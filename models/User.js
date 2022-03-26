module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      idx: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      id: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      passwd: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      timestamps: false, // createAt, updateAt 활성화
      paranoid: false, // deleteAt 옵션
    }
  );

  return User;
};
