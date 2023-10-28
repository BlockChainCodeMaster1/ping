const INDEX = (sequelize, DataTypes) => {
  var table = sequelize.define('index', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    index: DataTypes.INTEGER,
  })
  table.sync();
  return table;
}

export default INDEX;