import { Sequelize } from '@sequelize/core';
import configs from "./db.json";
import STATE from "../model/state";
import USERS from "../model/users";
import PUBLIC from "../model/public";
import PRIVATE from "../model/private";
import INDEX from "../model/index";

const dbHost = configs.mysql.host,
  dbPort = configs.mysql.port,
  dbUsername = configs.mysql.username,
  dbPassword = configs.mysql.password,
  dbName = configs.mysql.dbName;

//mysql connect option
const db = {
  sequelize: new Sequelize(dbName, dbUsername, dbPassword, {
    host: dbHost,
    dialect: "mysql",
    port: dbPort,
    operatorsAliases: false,
    dialectOptions: {
      connectTimeout: 30000, // 设置连接超时时间为 30 秒
    },
    pool: {
      max: 30,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    define: {
      freezeTableName: true,
      timestamps: false,
    },
  }),
};

db.STATE = STATE(db.sequelize, Sequelize.DataTypes);
db.USERS = USERS(db.sequelize, Sequelize.DataTypes);
db.PUBLIC = PUBLIC(db.sequelize, Sequelize.DataTypes);
db.PRIVATE = PRIVATE(db.sequelize, Sequelize.DataTypes);
db.INDEX = INDEX(db.sequelize, Sequelize.DataTypes);


export default db;