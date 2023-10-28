const PUBILC = (sequelize, DataTypes) => {
  var table = sequelize.define('public', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    from: DataTypes.STRING,
    to: DataTypes.STRING,
    signature: DataTypes.STRING,
    type: DataTypes.INTEGER,
    range:  DataTypes.INTEGER,
    inviteCode: DataTypes.STRING,
    date: DataTypes.STRING,
    ga: DataTypes.STRING,
    status: DataTypes.INTEGER
  })
  table.sync();
  return table;
}

export default PUBILC;