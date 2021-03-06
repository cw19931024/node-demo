const { pool, app, Result } = require("./connect");
const user = require("./Api/user/index");
const menu = require("./Api/menu");
const property = require("./Api/property");
const jwt = require("jsonwebtoken");
const port = 1124;
app.listen(port, () => {
  console.log("服务启动,端口号:"+port);
});

app.all("*", (req, res, next) => {
  let url = urlString(req.url);
  console.log(url);
  if (
    true ||
    (url[0] == "user" && (url[1] == "login" || url[1] == "register"))
  ) {
    next();
  } else {
    let token = req.get("Authorization");
    console.log(token);
    jwt.verify(token, "jwt", (err, decode) => {
      if (err) {
        res.json({ status: false, msg: "token以失效" });
      } else {
        next();
      }
    });
  }
});

app.all("/", (req, res) => {
  pool.getConnection((err, conn) => {
    res.json({ a: "b" });
    conn.release(); //释放连接池，等待别的连接使用
  });
});

app.use("/user", user);
app.use("/menu", menu);
app.use("/property", property);
/**
 * res.json("hello word!"); //以json返回给前端;
 * res.send('hello word!') //以页面返回;
 * res.download('hello word!') //以文件返回
 */

function urlString(url) {
  // 解析用户请求的路径
  let address = url.split("?")[0];
  address = address.split("/");
  address.splice(0, 1);
  return address;
}
