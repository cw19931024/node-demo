const { pool, router, Result } = require("../../connect");

router.get("/list", (req, res) => {
  pool.getConnection((err, çonn) => {
    const sql = `select * from property where type='${req.query.type}' and isTop='${req.query.isTop}'`;
    çonn.query(sql, (e, r) => {
      if (!e || r.length > 0) {
        res.json(new Result({ data: r, code: 1, count: r.length }));
      } else {
        res.json(new Result({ data: r, code: 0, msg: "操作失败" }));
      }
    });
  });
});

module.exports = router;
