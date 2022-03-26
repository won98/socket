module.exports = (sequelize, DataTypes) => {
  const Roomlist = sequelize.define(
    "roomlist",
    {
      idx: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      roomname: {
        type: DataTypes.STRING, //설정 안해주면 VARCHAR(255)로 자동 설정됨
        allowNull: false,
      },
      users: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      timestamp: false,
    }
  );
  return Roomlist;
};
