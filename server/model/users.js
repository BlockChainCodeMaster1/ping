export default function (sequelize, DataTypes) {
  var USERS = sequelize.define('users', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
    screenName: DataTypes.STRING,
    twitterId: DataTypes.STRING,
    profileImageUrl: DataTypes.STRING,
    token:  DataTypes.STRING,
    tokenSecret : DataTypes.STRING,
  })
  USERS.sync();
  return USERS;
}
