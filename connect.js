const express = require("express");
const bodyParser = require("body-parser"); //解析参数
const cors = require("cors"); //跨域
const mysql = require("mysql");
const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.json()); //解析json请求
app.use(bodyParser.urlencoded({ extends: false })); //解析表单请求

const options = {
  host: "localhost",
  user: "root",
  password: "root",
  port: "3306",
  database: "cw19931024",
  connectTimeout: 5000,
};

repool();

function repool() {
  //断线重连机制
  pool = mysql.createPool({
    ...options,
    waitForConnections: true, //当无连接池可用时，等待(true)还是抛错（false)
    connectionLimit: 100, //连接数限制
    queueLimit: 0, //最大连接等待数(0为不限制)
  }); //创立连接池
  pool.on(
    "error",
    (err) => err.code === "PROTOCOL_CONNECTION_LOST" && setTimeout(repool, 2000)
  );
  app.all("*", (_, __, next) =>
    pool.getConnection((err) => (err && setTimeout(repool, 2000)) || next())
  );
}

function Result({ code = 0, msg = "", data = [] }) {
  this.code = code;
  this.msg = msg;
  this.data = data;
}

module.exports = { pool, Result, router, app };
