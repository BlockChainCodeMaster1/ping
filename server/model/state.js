export default function (sequelize, DataTypes) {
  var STATE = sequelize.define('state', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    userId: DataTypes.STRING,
    tweetId: DataTypes.STRING,
    retweet: DataTypes.STRING,
    replay: DataTypes.STRING,
    like:  DataTypes.STRING,
    state : DataTypes.STRING,
  })
  STATE.sync();
  return STATE;
}
