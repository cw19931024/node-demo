const { pool, router, Result } = require("../connect");
const jwt = require("jsonwebtoken");

router.get("/login", (req, res) => {
  pool.getConnection((err, çonn) => {
    const sql = `select * from user WHERE userName='${req.query.username}'AND userPass='${req.query.userpass}'`;
    çonn.query(sql, (e, r) => {
      if (r.length > 0) {
        let token = jwt.sign({ name: req.query.username }, "jwt", {
          expiresIn: 60 * 60 * 1,
        });
        res.json(new Result({ data: Object.assign(r[0],{token:token}), code: 112}));
      } else {
        res.json(new Result({ data: r, code: 0, msg: "账号或密码错误" }));
      }
    });
  });
});

router.get("/register", (req, res) => {
  pool.getConnection((err, çonn) => {
    const sql = `select * from user WHERE userName='${req.query.username}'AND userPass='${req.query.userpass}'`;
    çonn.query(sql, (e, r) => {
      if (r.length > 0) {
        res.json(new Result({ data: r, code: 122 }));
      } else {
        res.json(new Result({ data: r, code: 0, msg: "原始密码错误" }));
      }
    });
  });
});

module.exports = router;
