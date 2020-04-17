const { pool, router, Result } = require("../../connect");

router.get("/top", (req, res) => {
  pool.getConnection((err, conn) => {
    const sql = `select * from topMenu`;
    conn.query(sql, (e, r) => {
      res.json(new Result({ data: r, code: 1 }));
    });
  });
});

router.get("/left", (req, res) => {
  pool.getConnection((err, conn) => {
    const sql = `select * from leftMenu where topMenu='${req.query.topMenuId}'`;
    conn.query(sql, (e, arr) => {
      if (!e) {
        res.json(new Result({ data: TreeData(arr || []), code: 1 }));
      } else {
        console.log("数据库连接错误:" + e.message);
        res.json(new Result({ data: [], code: 0, msg: "操作失败" }));
      }
    });
  });
});

function TreeData(data) {
  let arr = [],
    children = [];
  data.forEach((item) => {
    if (item.parent_id == 0) {
      arr.push(item);
    } else {
      children.push(item);
    }
  });

  arr.forEach((el) => {
    el.chidlren = [];
    children.forEach((item) => {
      if (el.menuId === item.parent_id) {
        el.chidlren.push(item);
      }
    });
  });
  return arr;
}

module.exports = router;
