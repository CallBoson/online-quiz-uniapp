const jwt = require("../utils/jwt.js");

const whiteList = ["/user/login", "/user/register", "/upload"];
exports.authenticateToken = async (req, res, next) => {
  // 接口白名单
  if (whiteList.includes(req.path)) {
    return next();
  }

  // 获取 Authorization 头
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    return res.error("请先登录", 401);
  }

  // 验证 token 是否有效
  const decrypt = await jwt.decrypt(token);
  if (!decrypt) {
    return res.error("请重新登录", 403);
  }
  // 将用户信息保存到请求中，以便后续的处理程序可以使用它
  req.user = decrypt;
  next();
};
