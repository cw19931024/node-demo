const { pool, router, Result } = require("../connect");

router.get("/top", (req, res) => {
  pool.getConnection((err, çonn) => {
    const sql = `select * from topMenu`;
    çonn.query(sql, (e, r) => {
      res.json(new Result({ data: r, code: 1 }));
    });
  });
});

router.get("/left", (req, res) => {
  pool.getConnection((err, çonn) => {
    const sql = `select * from leftMenu`;
    çonn.query(sql, (e, arr) => {
      res.json(new Result({ data: TreeData(arr), code: 1 }));
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
  console.log(arr);
  arr.forEach((el) => {
    el.chidlren = [];
    children.forEach((item) => {
      if (el.menuId === item.parent_id) {
        el.chidlren.push(item);
      }
    });
  });
  console.log(arr);
  return arr;
}

module.exports = router;
