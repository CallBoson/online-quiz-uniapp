const { Sequelize } = require("sequelize");

// 创建 Sequelize 实例
const sequelize = new Sequelize(
  "online_quiz",
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD,
  {
    host: process.env.MYSQL_HOST, // 数据库主机名
    dialect: "mysql", // 数据库类型
    port: process.env.MYSQL_PORT, // 数据库端口号
    pool: {
      // 连接池配置
      max: 5, // 最大连接数
      min: 0, // 最小连接数
      acquire: 30000, // 连接超时时间（毫秒）
      idle: 10000, // 连接空闲时间（毫秒）
    },
    logging: false, // 是否启用日志记录
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("数据库连接成功");
  })
  .catch((err) => {
    console.error(err);
    throw err;
  });

module.exports = sequelize;
